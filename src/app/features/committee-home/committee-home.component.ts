import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountService } from 'src/app/core/account-service/account.service';
import {
  PetitionsByOwnerInput,
  PetitionStatusQuery,
} from 'src/app/core/api/API';
import { GetCommitteePetitionsService } from 'src/app/logic/petition/get-committee-petitions.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-committee-home',
  templateUrl: './committee-home.component.html',
  providers: [GetCommitteePetitionsService],
})
export class CommitteeHomeComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  protected items: ResponsePetition[] = [];
  private _petitionsByOwnerInput: PetitionsByOwnerInput = {
    status: PetitionStatusQuery.ANY,
    owner: '',
  };

  constructor(private _committeeLogic: GetCommitteePetitionsService) {}

  ngOnInit(): void {
    this._committeeLogic.success$.subscribe((data) => {
      this.items = this.items.concat(data?.items ? data.items : []);
      this.cursor = data?.cursor;
    });
    this.error$ = this._committeeLogic.error$;
    this.loading$ = this._committeeLogic.loading$;
    this.getPetitions();
  }

  private getPetitions() {
    this._committeeLogic.getPetitions(this._petitionsByOwnerInput);
  }

  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
