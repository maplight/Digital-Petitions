import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  protected is_logged: boolean = true;
  protected name: string = '';
  protected email: string = '';
  constructor() {}

  ngOnInit(): void {}
}
