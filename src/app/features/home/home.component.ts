import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { GetPublicPetitionsActiveService } from 'src/app/logic/petition/get-public-petitions-active.service';

import {
  FilterByType,
  FilterByTypeData,
} from 'src/app/shared/models/filter/filter-by-type';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-home',
  templateUrl: './home.component.html',
  providers: [GetPublicPetitionsActiveService],
})
export class HomeComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  protected items: ResponsePetition[] = [];
  private petitionsByTypeInput: PetitionsByTypeInput = {
    status: PetitionStatusQuery.ACTIVE,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;

  constructor(
    private _getPetitionsActiveLogic: GetPublicPetitionsActiveService
  ) {}

  ngOnInit(): void {
    this._getPetitionsActiveLogic.success$.subscribe((data) => {
      this.items = this.items.concat(data?.items ? data.items : []);
      this.cursor = data?.cursor;
    });
    this.error$ = this._getPetitionsActiveLogic.error$;
    this.loading$ = this._getPetitionsActiveLogic.loading$;
    this.getPetitions();
  }

  filter(value: PetitionType | undefined | 'ANY') {
    this.petitionsByTypeInput.type = value === 'ANY' ? undefined : value;

    this.loadingUp = true;
    this.items = [];
    this.cursor = undefined;
    this.getPetitions();
  }

  private getPetitions() {
    this.petitionsByTypeInput.cursor = this.cursor;
    this._getPetitionsActiveLogic.getPetitionsAnonymous(
      this.petitionsByTypeInput
    );
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
