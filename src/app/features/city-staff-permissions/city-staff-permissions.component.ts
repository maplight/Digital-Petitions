import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import {
  AccessLevel,
  AccessLevelQuery,
  SearchUsersInput,
  User,
} from 'src/app/core/api/API';
import { GetAllUsersService } from 'src/app/logic/admin/get-all-users.service';
import { RemoveMemberService } from 'src/app/logic/admin/remove-member.service';

import { ChangeAccountPermissionComponent } from './change-account-permission/change-account-permission.component';
import { NewMemberComponent } from './new-member/new-member.component';

@Component({
  selector: 'dp-city-staff-permissions',
  templateUrl: './city-staff-permissions.component.html',
  providers: [GetAllUsersService, RemoveMemberService],
})
export class CityStaffPermissionsComponent implements OnInit, OnDestroy {
  protected items: User[] = [];
  protected cursor!: boolean;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  private _unSuscribeAll: Subject<void> = new Subject();
  protected loadingUp: boolean = true;
  private searchUsersInput: SearchUsersInput = {};
  protected displayedColumns: string[] = [
    'member',
    'email',
    'status',
    'option',
  ];
  tableStyle = 'w-full';
  protected filterAccesLevel: { name: string; value: AccessLevelQuery }[] = [
    { name: 'Guest', value: AccessLevelQuery.GUEST },
    { name: 'Admin', value: AccessLevelQuery.ADMIN },
    { name: 'Petitioner', value: AccessLevelQuery.PETITIONER },
    { name: 'Staff', value: AccessLevelQuery.STAFF },
  ];

  constructor(
    private _getAllUserLogic: GetAllUsersService,
    private _dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this._unSuscribeAll.next();
    this._unSuscribeAll.complete();
  }

  ngOnInit(): void {
    this._getAllUserLogic.success$.subscribe((data) => {
      if (data?.items) {
        this.items = this.items.concat(data.items);
      }
      this.cursor = data?.token ? true : false;
    });

    this.error$ = this._getAllUserLogic.error$;
    this.loading$ = this._getAllUserLogic.loading$;
    this.getUsers(false);
  }

  openDialogNewMember(): void {
    const dialogRef = this._dialog.open(NewMemberComponent, {
      width: '690px',
    });
  }

  openDialogChangeAccountPermission(id: string, access: AccessLevel): void {
    this._dialog
      .open(ChangeAccountPermissionComponent, {
        width: '690px',
        data: { id: id, access: access },
      })
      .afterClosed()
      .subscribe((_) => {
        this.getUsers(false);
      });
  }

  getUsers(cursorFlag: boolean) {
    if (!cursorFlag) {
      this.items = [];
    }
    this.loadingUp = !cursorFlag;

    this._getAllUserLogic.getMembers(this.searchUsersInput, cursorFlag);
  }

  pageNumber() {
    this.getUsers(true);
  }

  searchName(key: string) {
    this.items = [];
    this.searchUsersInput.searchName = key;
    this._getAllUserLogic.getMembers(this.searchUsersInput, false);
  }
  searchEmail(key: string) {
    this.items = [];
    this.searchUsersInput.searchEmail = key;
    this._getAllUserLogic.getMembers(this.searchUsersInput, false);
  }
  searchAccessLevel(key: AccessLevelQuery | 'Any') {
    key == 'Any'
      ? (this.searchUsersInput.searchGroup = null)
      : (this.searchUsersInput.searchGroup = key);
    this.items = [];
    this._getAllUserLogic.getMembers(this.searchUsersInput, false);
  }
}
