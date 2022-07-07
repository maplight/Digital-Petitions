import { Component, OnInit } from '@angular/core';
import { state, states } from './states';

@Component({
  selector: 'dp-sing-up',
  templateUrl: './sing-up-committee.component.html',
  styleUrls: ['./sing-up-committee.component.scss'],
})
export class SingUpCommitteeComponent implements OnInit {
  local_states: state[] = [];
  hide = true;
  constructor() {
    this.local_states = states;
  }

  ngOnInit(): void {}
}
