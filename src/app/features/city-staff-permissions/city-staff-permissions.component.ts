import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subject, takeUntil, tap } from 'rxjs';

import { GetAllUsersService } from 'src/app/logic/admin/get-all-users.service';
import { RemoveMemberService } from 'src/app/logic/admin/remove-member.service';
import { DialogResultComponent } from 'src/app/shared/dialog-result/dialog-result.component';
import { Member } from 'src/app/shared/models/admin/member';

import { ChangeAccountPermissionComponent } from './change-account-permission/change-account-permission.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { RemoveMemberComponent } from './remove-member/remove-member.component';

@Component({
  selector: 'dp-city-staff-permissions',
  templateUrl: './city-staff-permissions.component.html',
  providers: [GetAllUsersService, RemoveMemberService],
})
export class CityStaffPermissionsComponent implements OnInit, OnDestroy {
  protected success$!: Observable<Member[] | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  private _unSuscribeAll: Subject<void> = new Subject();

  protected displayedColumns: string[] = [
    'member',
    'email',
    'status',
    'option',
  ];
  tableStyle = 'w-full';

  constructor(
    private _getAllUserLogic: GetAllUsersService,
    private _removeMember: RemoveMemberService,
    private _dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this._unSuscribeAll.next();
    this._unSuscribeAll.complete();
  }

  ngOnInit(): void {
    this.success$ = this._getAllUserLogic.success$;
    this._removeMember.success$
      .pipe(takeUntil(this._unSuscribeAll))
      .subscribe(() => {
        this._getAllUserLogic.getMembers();
        this._dialog.open(DialogResultComponent, {
          width: '520px',
          data: {
            title: 'User Successfully Deleted',
            message: '',
            success: true,
          },
        });
      });
    this.error$ = merge(
      this._getAllUserLogic.error$,
      this._removeMember.error$
    );
    this.loading$ = merge(
      this._getAllUserLogic.loading$,
      this._removeMember.loading$
    );
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

  removeMember(id: string) {
    const dialogRef = this._dialog.open(RemoveMemberComponent, {
      width: '480px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((response) => {
          if (response) {
            this._removeMember.formGroupValue(id);
          }
        })
      )
      .subscribe();
  }
}
