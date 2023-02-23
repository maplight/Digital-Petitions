import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-result-petition',
  templateUrl: './result-petition.component.html',
})
export class ResultPetitionComponent implements OnInit {
  @Input() data: ResponsePetition = {};

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  submit() {
    this._router.navigate(['/committee/home']);
  }
}
