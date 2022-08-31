import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GetAllUsersService } from 'src/app/logic/admin/get-all-users.service';
import { Member } from 'src/app/shared/models/admin/member';

import { ChangeAccountPermissionComponent } from './change-account-permission/change-account-permission.component';
import { NewMemberComponent } from './new-member/new-member.component';

@Component({
  selector: 'dp-city-staff-permissions',
  templateUrl: './city-staff-permissions.component.html',
  providers: [GetAllUsersService],
})
export class CityStaffPermissionsComponent implements OnInit {
  protected success$!: Observable<Member[] | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  protected displayedColumns: string[] = [
    'member',
    'email',
    'status',
    'option',
  ];
  tableStyle = 'w-full';

  constructor(
    private _getAllUserLogic: GetAllUsersService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.error$ = this._getAllUserLogic.error$;
    this.loading$ = this._getAllUserLogic.loading$;
    this.success$ = this._getAllUserLogic.success$;
    this._getAllUserLogic.getMembers();
  }

  openDialogNewMember(): void {
    const dialogRef = this._dialog.open(NewMemberComponent, {
      width: '690px',
    });
  }

  openDialogChangeAccountPermission(id: string): void {
    const dialogRef = this._dialog.open(ChangeAccountPermissionComponent, {
      width: '690px',
      data: { id: id },
    });
  }
}
