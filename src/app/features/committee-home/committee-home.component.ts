import { Component, OnInit } from '@angular/core';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-committee-home',
  templateUrl: './committee-home.component.html',
})
export class CommitteeHomeComponent implements OnInit {
  private petitions: ResponsePetition[] = [];
  constructor() {}

  ngOnInit(): void {}
}
