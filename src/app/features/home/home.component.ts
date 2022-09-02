import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetitionsByTypeInput, PetitionType } from 'src/app/core/api/API';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';

import {
  FilterByType,
  FilterByTypeData,
} from 'src/app/shared/models/filter/filter-by-type';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

@Component({
  selector: 'dp-home',
  templateUrl: './home.component.html',
  providers: [GetPetitionsActiveService],
})
export class HomeComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loadingDown: boolean = !this.loadingUp;
  protected successPetition$!: Observable<BufferPetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  private petitionsByTypeInput: PetitionsByTypeInput = {
    status: undefined,
    type: undefined,
  };

  protected filterByCategory: FilterByType[] = FilterByTypeData;

  constructor(private _getPetitionsActiveLogic: GetPetitionsActiveService) {}

  ngOnInit(): void {
    this.successPetition$ = this._getPetitionsActiveLogic.success$;
    this.error$ = this._getPetitionsActiveLogic.error$;
    this.loading$ = this._getPetitionsActiveLogic.loading$;
    this.getPetitions();
  }

  filter(value: PetitionType | undefined) {
    this.petitionsByTypeInput.type = value;

    this.loadingUp = true;
    this.getPetitions();
  }

  private getPetitions() {
    this._getPetitionsActiveLogic.getPetitions(this.petitionsByTypeInput);
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
