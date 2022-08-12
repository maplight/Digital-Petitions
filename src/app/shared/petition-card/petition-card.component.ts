import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-petition-card',
  templateUrl: './petition-card.component.html',
})
export class PetitionCardComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};
  protected id: number | undefined;
  protected title: string | undefined;
  protected subtitle: string | undefined;
  protected text: string = '';
  protected type: string | undefined;
  protected status: string | undefined;
  protected currentSign: number | undefined = 0;
  protected totalSign: number | undefined;
  protected percent: number = 0;
  protected characters: number = 500;
  protected showMoreOption: boolean = false;

  protected StatusStyleCurrent: string = '';
  protected StatusStyleWhite: string =
    'h-[26px] bg-[#F8F8F8] px-4 py-1 text-[#5C5C5C]  rounded';
  protected StatusStyleGreen: string =
    'h-[26px] bg-[#3AC922] px-4 py-1 text-black  rounded';
  protected StatusStyleRed: string =
    'h-[26px] bg-[#FF3030] px-4 py-1 text-black  rounded';

  @Input() buttonText: string | boolean = 'View Petition';
  @Input() linkText: string = 'View More';
  @Input() basicRoute: string = '';
  @Input() disabled: boolean = false;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.data.dataCandidate) {
      this.title = this.data.dataCandidate.fullName;
      this.id = this.data.dataCandidate.id;
      this.subtitle =
        this.data.dataCandidate.office + ' - ' + this.data.dataCandidate.party;
      this.text = this.data.dataCandidate.address;
      this.type = this.data.dataCandidate.atributes?.type;
      this.status = this.data.dataCandidate.atributes?.status;
      this.currentSign = this.data.dataCandidate.atributes?.currentSign;
      this.totalSign = this.data.dataCandidate.atributes?.totalSign;
    } else if (!!this.data.dataIssue) {
      this.id = this.data.dataIssue.id;
      this.title = this.data.dataIssue.title;
      this.text = this.data.dataIssue.detail;
      this.type = this.data.dataIssue.atributes?.type;
      this.status = this.data.dataIssue.atributes?.status;
      this.currentSign = this.data.dataIssue.atributes?.currentSign;
      this.totalSign = this.data.dataIssue.atributes?.totalSign;
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
          this.status = 'Qualified';
          this.StatusStyleCurrent = this.StatusStyleGreen;
          break;
        case 'failed':
          this.status = 'Did Not Qualify';
          this.StatusStyleCurrent = this.StatusStyleRed;
          break;
        case 'open':
          this.status = '';
          this.StatusStyleCurrent = '';
          break;
      }
    }
  }
  protected showMore() {
    if (!this.disabled) {
      this.characters = this.data.dataIssue
        ? this.data.dataIssue.detail.length
        : 500;
      this.showMoreOption = false;
    }
  }
  ngOnInit(): void {
    if (this.data.dataIssue) {
      this.showMoreOption = this.data.dataIssue.detail.length > 500;
    }
  }
}
