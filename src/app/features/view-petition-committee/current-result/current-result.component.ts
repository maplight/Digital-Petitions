import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PetitionStatus, SignatureSummary } from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-current-result',
  templateUrl: './current-result.component.html',
})
export class CurrentResultComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};

  protected status: PetitionStatus | undefined;
  protected signatureSummary: SignatureSummary | null | undefined;

  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'h-[26px] bg-[#F8F8F8] px-4 py-1 text-[#5C5C5C]  rounded';
  protected StatusStyleGreen: string =
    'h-[26px] bg-[#3AC922] px-4 py-1 text-black  rounded';
  protected StatusStyleRed: string =
    'h-[26px] bg-[#FF3030] px-4 py-1 text-black  rounded';

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    let { status } = this.data.dataCandidate
      ? this.data.dataCandidate
      : this.data.dataIssue
      ? this.data.dataIssue
      : { status: undefined };
    this.status = status;

    let { signatureSummary } = this.data.dataCandidate
      ? this.data.dataCandidate
      : this.data.dataIssue
      ? this.data.dataIssue
      : { signatureSummary: undefined };
    this.signatureSummary = signatureSummary;

    if (status) {
      switch (status) {
        case PetitionStatus.NEW:
          this.StatusStyleCurrent = this.StatusStyleWhite;
          break;
        case PetitionStatus.QUALIFIED:
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case PetitionStatus.REJECTED:
          this.StatusStyleCurrent = this.StatusStyleRed;
          break;
        case PetitionStatus.ACTIVE:
          this.StatusStyleCurrent = '';
          break;
      }
    }
  }

  ngOnInit(): void {}
}
