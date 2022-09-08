import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import {
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { CityStaffHomeService } from 'src/app/logic/admin/city-staff-home.service';

import { User } from 'src/app/shared/models/auth/user';
import {
  FilterByStatus,
  FilterByStatusAny,
  FilterByStatusInactive,
} from 'src/app/shared/models/filter/filter-by-status';
import {
  FilterByType,
  FilterByTypeData,
} from 'src/app/shared/models/filter/filter-by-type';

import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

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
    status: PetitionStatusQuery.ANY,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;
  protected filterByStatus: FilterByStatus[] = FilterByStatusAny;
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

  filterCategory(value: PetitionType | undefined | 'ANY') {
    this.petitionsByTypeInput.type = value === 'ANY' ? undefined : value;
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
