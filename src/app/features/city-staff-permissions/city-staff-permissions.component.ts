import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllUsersService } from 'src/app/logic/admin/get-all-users.service';
import { Member } from 'src/app/shared/models/admin/member';

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

  constructor(private _getAllUserLogic: GetAllUsersService) {
    this.error$ = this._getAllUserLogic.error$;
    this.loading$ = this._getAllUserLogic.loading$;
    this.success$ = this._getAllUserLogic.success$;
  }

  ngOnInit(): void {
    this._getAllUserLogic.getMembers();
  }
}
