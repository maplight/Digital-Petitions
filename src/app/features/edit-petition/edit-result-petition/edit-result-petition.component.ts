import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-edit-result-petition',
  templateUrl: './edit-result-petition.component.html',
})
export class EditResultPetitionComponent implements OnInit {
  @Input() data: ResponsePetition = {};
  protected characters: number = 500;
  protected showMoreOption: boolean = false;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (this.data.dataIssue) {
      this.showMoreOption = this.data.dataIssue.detail.length > 500;
    }
  }

  submit() {
    this._router.navigate(['/committee/home']);
  }
  protected showMore() {
    this.characters = this.data.dataIssue
      ? this.data.dataIssue.detail.length
      : 500;
    this.showMoreOption = false;
  }
}
