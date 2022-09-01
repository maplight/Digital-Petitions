import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import {
  PetitionListStatusCheck,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { CityStaffHomeService } from 'src/app/logic/admin/city-staff-home.service';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { CognitoUserLite, User } from 'src/app/shared/models/auth/user';
import { FilterData } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-home',
  templateUrl: './city-staff-home.component.html',
  providers: [CityStaffHomeService],
})
export class CityStaffHomeComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loadingDown: boolean = !this.loadingUp;
  protected successLogin$!: Observable<User | null>;
  protected successPetition$!: Observable<BufferPetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  private currentFilter: FilterData[] = [
    {
      property: 'Category',
      value: 'All',
      page: 0,
    },
    {
      property: 'Status',
      value: PetitionListStatusCheck.ANY,
      page: 0,
    },
    {
      property: 'Search',
      value: '',
      page: 0,
    },
  ];

  protected filterByCategory: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Ballot', value: 'issue', active: false },
    { name: 'Candidate', value: 'candidate', active: false },
  ];

  protected filterByStatus: {
    name: string;
    value: PetitionListStatusCheck;
    active: boolean;
  }[] = [
    {
      name: 'All types',
      value: PetitionListStatusCheck.ANY,
      active: true,
    },
    { name: 'Pased', value: PetitionListStatusCheck.QUALIFIED, active: false },
    {
      name: 'Failed',
      value: PetitionListStatusCheck.NOT_QUALIFIED,
      active: false,
    },
  ];
  constructor(
    private _cityStaffHomeLogic: CityStaffHomeService,
    private _accountLogic: AccountService
  ) {}

  ngOnInit(): void {
    this.successLogin$ = this._accountLogic.currentUser$;
    this.successPetition$ = this._cityStaffHomeLogic.success$;
    this.error$ = this._cityStaffHomeLogic.error$;
    this.loading$ = this._cityStaffHomeLogic.loading$;
    this.getPetitions();
  }

  search(value: string) {
    if (value.length > 0) {
      this.currentFilter[2].value = value;
      this.loadingUp = true;
      this.getPetitions();
    }
  }

  filterCategory(value: string) {
    this.currentFilter[0].value = value;

    this.loadingUp = true;
    this.getPetitions();
  }

  filterStatus(value: string) {
    this.currentFilter[1].value = value;
    this.loadingUp = true;
    this.getPetitions();
  }
  private getPetitions() {
    this._cityStaffHomeLogic.getPetitions(this.currentFilter[1].value);
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
