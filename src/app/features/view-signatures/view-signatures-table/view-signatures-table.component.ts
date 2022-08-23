import { Component, OnInit } from '@angular/core';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';
const ELEMENT_DATA: SignaturesData[] = [
  {
    selected: true,
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    selected: false,
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    selected: false,
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    selected: false,
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
];
@Component({
  selector: 'dp-view-signatures-table',
  templateUrl: './view-signatures-table.component.html',
})
export class ViewSignaturesTableComponent implements OnInit {
  tableBorderless: boolean = false;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = [
    'check',
    'signer_name',
    'signer_date',
    'address',
    'email',
    'status',
  ];
  constructor() {}

  ngOnInit(): void {}
}
