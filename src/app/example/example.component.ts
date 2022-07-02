import { Component, OnInit } from '@angular/core';
import { SignElement } from './sign-element.interface';

const ELEMENT_DATA: SignElement[] = [
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
];

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  tableBorderless: boolean = false;

  constructor() {}

  title = 'digital-petitions';
  displayedColumns: string[] = [
    'check',
    'signer_name',
    'signer_date',
    'address',
    'email',
    'registered',
  ];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<SignElement>();

  ngOnInit(): void {}
}
