import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dp-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  items = [
    {
      icon: 'home',
      route: 'city-staff/home',
      text: 'Home',
    },
    {
      icon: 'settings_applications',
      route: 'city-staff/admin',
      text: 'Site Admin',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
