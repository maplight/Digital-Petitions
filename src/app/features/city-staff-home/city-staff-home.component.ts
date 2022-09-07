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
  PetitionsByTypeInput,
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { CityStaffHomeService } from 'src/app/logic/admin/city-staff-home.service';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { User } from 'src/app/shared/models/auth/user';
import { FilterData } from 'src/app/shared/models/exports';
import {
  FilterByStatus,
  FilterByStatusInactive,
} from 'src/app/shared/models/filter/filter-by-status';
import {
  FilterByType,
  FilterByTypeData,
} from 'src/app/shared/models/filter/filter-by-type';
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
  private petitionsByTypeInput: PetitionsByTypeInput = {
    status: undefined,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;
  protected filterByStatus: FilterByStatus[] = FilterByStatusInactive;
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

  search(value: string) {}

  filterCategory(value: PetitionType | undefined) {
    this.petitionsByTypeInput.type = value;
    this.loadingUp = true;
    this.getPetitions();
  }

  filterStatus(value: PetitionStatusQuery | undefined) {
    this.petitionsByTypeInput.status = value;
    this.loadingUp = true;
    this.getPetitions();
  }

  private getPetitions() {
    this._cityStaffHomeLogic.getPetitions(this.petitionsByTypeInput);
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
