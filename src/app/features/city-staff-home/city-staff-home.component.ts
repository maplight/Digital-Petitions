import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import {
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
  SignatureStatusQuery,
} from 'src/app/core/api/API';
import { CityStaffHomeService } from 'src/app/logic/admin/city-staff-home.service';
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
  protected get loadingDown(): boolean {
    return !this.loadingUp;
  }

  protected currentUser!: string | undefined;
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
    this.filterByCategory.forEach((item) => {
      item.value === 'ANY' ? (item.active = true) : (item.active = false);
    });
    this.filterByStatus.forEach((item) => {
      (item.value as PetitionStatusQuery) === 'ANY'
        ? (item.active = true)
        : (item.active = false);
    });
    this.currentUser = this._accountLogic.currentUser?.attributes.given_name;
    this.successPetition$ = this._cityStaffHomeLogic.success$;
    this.error$ = this._cityStaffHomeLogic.error$;
    this.loading$ = this._cityStaffHomeLogic.loading$;
    this.getPetitions();
  }

  search(value: string) {}

  filterCategory(value: PetitionType | undefined | 'ANY') {
    this.petitionsByTypeInput.type = value === 'ANY' ? undefined : value;
    this.loadingUp = true;

    this.getPetitions(true);
  }

  filterStatus(value: PetitionStatusQuery | SignatureStatusQuery) {
    this.petitionsByTypeInput.status = value as PetitionStatusQuery;
    this.loadingUp = true;

    this.getPetitions(true);
  }

  private getPetitions(reset: boolean = false) {
    this._cityStaffHomeLogic.getPetitions(this.petitionsByTypeInput, reset);
  }

  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
