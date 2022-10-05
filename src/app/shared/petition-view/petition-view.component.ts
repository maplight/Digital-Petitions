import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  CandidatePetition,
  IssuePetition,
  PetitionStatus,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-petition-view',
  templateUrl: './petition-view.component.html',
})
export class PetitionViewComponent implements OnChanges {
  @Input() data: ResponsePetition = {};
  @Input() showStatus: boolean = false;
  protected petition: IssuePetition | CandidatePetition | undefined;
  protected StatusStyleCurrent: string = '';
  protected StatusStyleYellow: string =
    'flex bg-[#F6D523] px-2 py-1 rounded-full items-center justify-center w-fit';
  protected StatusStyleGreen: string =
    'flex bg-[#3AC922] px-2 py-1 rounded-full items-center justify-center w-fit';
  protected StatusStyleGray: string =
    'flex bg-[#8A8A8A] px-2 py-1 rounded-full items-center justify-center w-fit';
  constructor() {}
  ngOnChanges(changes?: SimpleChanges): void {
    this.petition = this.data.dataCandidate
      ? this.data.dataCandidate
      : this.data.dataIssue
      ? this.data.dataIssue
      : undefined;

    if (this.petition) {
      switch (this.petition.status) {
        case PetitionStatus.NEW:
          this.StatusStyleCurrent = this.StatusStyleYellow;
          break;
        case PetitionStatus.QUALIFIED:
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case PetitionStatus.CANCELED:
          this.StatusStyleCurrent = this.StatusStyleGray;
          break;
      }
    }
  }
}
