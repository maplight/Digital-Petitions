import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  protected is_logged: boolean = true;
  protected first_name: string = 'James';
  protected last_name: string = 'Philby';
  protected img_url: string = '';
  protected email: string = '';
  constructor() {}

  ngOnInit(): void {}
}
