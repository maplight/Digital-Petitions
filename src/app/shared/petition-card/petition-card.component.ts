import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PetitionStatus } from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-petition-card',
  templateUrl: './petition-card.component.html',
})
export class PetitionCardComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};

  @Input() showType: boolean = false;
  @Input() showStatus: boolean = false;
  @Input() showSignature: boolean = false;
  @Input() showExtraDates: boolean = false;
  @Input() characters: number = 500;
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
  ngOnChanges(changes?: SimpleChanges): void {
    let { status } = this.data.dataCandidate
      ? this.data.dataCandidate
      : this.data.dataIssue
      ? this.data.dataIssue
      : { status: null };
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
  protected showMore() {
    if (!this.disabled) {
      this.characters = this.data.dataIssue
        ? this.data.dataIssue.detail.length
        : this.characters;
      this.showMoreOption = false;
    }
  }

  ngOnInit(): void {
    if (this.data.dataIssue) {
      this.showMoreOption = this.data.dataIssue.detail.length > this.characters;
    }
  }
}
