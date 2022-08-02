import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IssuePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-result-petition',
  templateUrl: './result-petition.component.html',
})
export class ResultPetitionComponent implements OnInit {
  @Input() data: IssuePetitionData = { title: '', text: '' };

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  submit() {
    this._router.navigate([]);
  }
}
