import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { PetitionsByOwnerInput } from 'src/app/core/api/API';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-committee-home',
  templateUrl: './committee-home.component.html',
})
export class CommitteeHomeComponent implements OnInit {
  protected loadingUp: boolean = true;
  protected loadingDown: boolean = !this.loadingUp;
  protected successPetition$!: Observable<BufferPetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected cursor: string | undefined;
  private _petitionsByOwnerInput: PetitionsByOwnerInput = {
    status: undefined,
    owner: '',
  };

  constructor(
    private _committeeLogic: GetPetitionsCommitteeService,
    private _accountLogic: AccountService
  ) {}

  ngOnInit(): void {
    this.successPetition$ = this._committeeLogic.success$;
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
