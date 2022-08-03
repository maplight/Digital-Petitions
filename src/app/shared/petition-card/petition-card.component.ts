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
  @Input() buttonText: string | boolean = 'View Petition';
  @Input() linkText: string = 'View More';
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.data.dataCandidate) {
      this.title = this.data.dataCandidate.fullName;
      this.subtitle =
        this.data.dataCandidate.office + ' - ' + this.data.dataCandidate.party;
      this.text = this.data.dataCandidate.address;
      this.type = this.data.dataCandidate.atributes?.type;
      this.status = this.data.dataCandidate.atributes?.status;
      this.currentSign = this.data.dataCandidate.atributes?.currentSign;
      this.totalSign = this.data.dataCandidate.atributes?.totalSign;
    } else if (!!this.data.dataIssue) {
      this.title = this.data.dataIssue.title;
      this.text = this.data.dataIssue.text;
      this.type = this.data.dataIssue.atributes?.type;
      this.status = this.data.dataIssue.atributes?.status;
      this.currentSign = this.data.dataIssue.atributes?.currentSign;
      this.totalSign = this.data.dataIssue.atributes?.totalSign;
    }
    if (!!this.currentSign && !!this.totalSign) {
      this.percent = (this.currentSign / this.totalSign) * 100;
    }
  }
  protected showMore() {
    this.characters = this.data.dataIssue
      ? this.data.dataIssue.text.length
      : 500;
    this.showMoreOption = false;
  }
  ngOnInit(): void {
    if (this.data.dataIssue) {
      this.showMoreOption = this.data.dataIssue.text.length > 500;
    }
  }
}
