import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

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
  private currentFilter: FilterData[] = [
    {
      property: 'Category',
      value: 'All',
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

  constructor(private _getPetitionsActiveLogic: GetPetitionsActiveService) {}

  ngOnInit(): void {
    this.successPetition$ = this._getPetitionsActiveLogic.success$;
    this.error$ = this._getPetitionsActiveLogic.error$;
    this.loading$ = this._getPetitionsActiveLogic.loading$;
    this.getPetitions();
  }

  filter(value: string) {
    this.currentFilter[0].value = value;

    this.loadingUp = true;
    this.getPetitions();
  }

  private getPetitions() {
    this._getPetitionsActiveLogic.getPetitions('ANY');
  }
  pageNumber() {
    this.loadingUp = false;
    this.getPetitions();
  }
}
