import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
  SignatureStatusQuery,
} from 'src/app/core/api/API';

import { GetInactivePetitionsService } from 'src/app/logic/petition/get-inactive-petitions.service';
import {
  FilterByStatus,
  FilterByStatusInactive,
} from 'src/app/shared/models/filter/filter-by-status';
import {
  FilterByType,
  FilterByTypeData,
} from 'src/app/shared/models/filter/filter-by-type';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-inactive-petitions',
  templateUrl: './inactive-petitions.component.html',
  providers: [GetInactivePetitionsService],
})
export class InactivePetitionsComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  protected items: ResponsePetition[] = [];
  private petitionsByTypeInput: PetitionsByTypeInput = {
    status: PetitionStatusQuery.INACTIVE,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;
  protected filterByStatus: FilterByStatus[] = FilterByStatusInactive;

  constructor(
    private _getPetitionsInactiveService: GetInactivePetitionsService
  ) {}

  ngOnInit(): void {
    this._getPetitionsInactiveService.success$.subscribe((data) => {
      this.items = this.items.concat(data?.items ? data.items : []);
      this.cursor = data?.cursor;
    });
    this.error$ = this._getPetitionsInactiveService.error$;
    this.loading$ = this._getPetitionsInactiveService.loading$;
    this.getPetitions();
  }

  filterCategory(value: PetitionType | undefined | 'ANY') {
    this.petitionsByTypeInput.type = value === 'ANY' ? undefined : value;

    this.loadingUp = true;
    this.items = [];
    this.cursor = undefined;
    this.getPetitions();
  }

  filterStatus(value: PetitionStatusQuery | SignatureStatusQuery) {
    this.petitionsByTypeInput.status = value as PetitionStatusQuery;

    this.loadingUp = true;
    this.items = [];
    this.cursor = undefined;
    this.getPetitions();
  }

  private getPetitions() {
    this._getPetitionsInactiveService.getPetitions(this.petitionsByTypeInput);
  }

  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
