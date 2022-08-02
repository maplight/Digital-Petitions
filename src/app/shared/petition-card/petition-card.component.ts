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
  protected text: string | undefined;
  protected type: string | undefined;
  protected status: string | undefined;
  protected currentSign: string | undefined;
  protected totalSign: string | undefined;
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
    }
  }

  ngOnInit(): void {}
}
