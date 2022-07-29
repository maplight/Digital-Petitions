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
  protected showMoreOption: boolean = this.data.dataIssue
    ? this.data.dataIssue.text.length > 500
    : false;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    console.log(this.characters + ' ' + this.showMoreOption);
  }

  submit() {
    this._router.navigate([]);
  }
  protected showMore() {
    this.characters = this.data.dataIssue
      ? this.data.dataIssue.text.length
      : 500;
    this.showMoreOption = false;
  }
}
