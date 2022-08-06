import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-current-result',
  templateUrl: './current-result.component.html',
})
export class CurrentResultComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};
  protected status: string | undefined;
  protected currentSign: number | undefined = 0;
  protected verifiedSign: number | undefined = 0;
  protected deadline: string | undefined = '';
  protected totalSign: number | undefined = 0;
  protected percent: number = 0;

  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'h-[26px] bg-[#F8F8F8] px-4 py-1 text-[#5C5C5C]  rounded';
  protected StatusStyleGreen: string =
    'h-[26px] bg-[#3AC922] px-4 py-1 text-black  rounded';
  protected StatusStyleRed: string =
    'h-[26px] bg-[#FF3030] px-4 py-1 text-black  rounded';

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.data.dataCandidate) {
      this.status = this.data.dataCandidate.atributes?.status;
      this.currentSign = this.data.dataCandidate.atributes?.currentSign;
      this.totalSign = this.data.dataCandidate.atributes?.totalSign;
      this.verifiedSign = this.data.dataCandidate.atributes?.verifiedSign;
      this.deadline = this.data.dataCandidate.atributes?.deadline;
    } else if (!!this.data.dataIssue) {
      this.status = this.data.dataIssue.atributes?.status;
      this.currentSign = this.data.dataIssue.atributes?.currentSign;
      this.totalSign = this.data.dataIssue.atributes?.totalSign;
      this.verifiedSign = this.data.dataIssue.atributes?.verifiedSign;
      this.deadline = this.data.dataIssue.atributes?.deadline;
    }
    if (!!this.currentSign && !!this.totalSign) {
      this.percent = (this.currentSign / this.totalSign) * 100;
    }
    if (this.status) {
      switch (this.status) {
        case 'new':
          this.status = 'Awaiting Approval';
          this.StatusStyleCurrent = this.StatusStyleWhite;
          break;
        case 'pased':
          this.status = 'Passed';
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case 'failed':
          this.status = 'Failed';
          this.StatusStyleCurrent = this.StatusStyleRed;
          break;
        case 'open':
          this.status = '';
          this.StatusStyleCurrent = '';
          break;
      }
    }
  }

  ngOnInit(): void {}
}
