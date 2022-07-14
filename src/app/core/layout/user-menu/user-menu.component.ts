import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dp-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  protected is_logged: boolean = true;
  protected first_name: string = 'Denismay';
  protected last_name: string = 'Concepcion';
  protected img_url: string =
    'https://scontent-mia3-2.xx.fbcdn.net/v/t1.6435-9/159920232_2805029483068326_8468044973819636209_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0gyKWY-at9oAX9-iCoY&_nc_ht=scontent-mia3-2.xx&oh=00_AT8mHJfHp3NUBIWyfD7KqZoXy1V4IeIv1Ip-SeLu9ZV08w&oe=62F51DC0';
  protected email: string = '';
  constructor() {}

  ngOnInit(): void {}
}
