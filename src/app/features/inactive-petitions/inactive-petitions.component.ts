import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import {
  GetPetitionsByTypeQuery,
  PetitionsByTypeInput,
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';

import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { GetPetitionsInactiveService } from 'src/app/logic/committee/getPetitionsInactiveService.service';
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
  selector: 'dp-inactive-petitions',
  templateUrl: './inactive-petitions.component.html',
})
export class InactivePetitionsComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loadingDown: boolean = !this.loadingUp;
  protected successPetition$!: Observable<BufferPetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;

  private petitionsByTypeInput: PetitionsByTypeInput = {
    status: PetitionStatusQuery.ANY,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;
  protected filterByStatus: FilterByStatus[] = FilterByStatusInactive;

  constructor(
    private _getPetitionsInactiveService: GetPetitionsInactiveService
  ) {}

  ngOnInit(): void {
    this.successPetition$ = this._getPetitionsInactiveService.success$;
    this.error$ = this._getPetitionsInactiveService.error$;
    this.loading$ = this._getPetitionsInactiveService.loading$;
    this.getPetitions();
  }
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
    this._getPetitionsInactiveService.getPetitions(this.petitionsByTypeInput);
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
