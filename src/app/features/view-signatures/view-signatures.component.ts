import { Component, OnInit } from '@angular/core';
import { FilterData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-view-signatures',
  templateUrl: './view-signatures.component.html',
})
export class ViewSignaturesComponent implements OnInit {
  protected disabledFilter: boolean = false;
  private currentFilter: FilterData[] = [
    {
      property: 'Status',
      value: 'All',
      page: 0,
    },
    {
      property: 'Search',
      value: '',
      page: 0,
    },
  ];
  protected sortBy: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Signer Name', value: 'Signer Name', active: false },
    { name: 'Signer Date', value: 'Signer Date', active: false },
    { name: 'Address', value: 'Address', active: false },
    { name: 'Email', value: 'Email', active: false },
    { name: 'Status', value: 'Status', active: false },
  ];
  protected filterByStatus: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Registered', value: 'registered', active: false },
    { name: 'Approved', value: 'approved', active: false },
    { name: 'Denied', value: 'denied', active: false },
  ];
  constructor() {}

  ngOnInit(): void {}

  search(value: string) {}
  sort(value: string) {}
  filterStatus(value: string) {}
}
