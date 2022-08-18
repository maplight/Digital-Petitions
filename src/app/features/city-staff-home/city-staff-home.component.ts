import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-home',
  templateUrl: './city-staff-home.component.html',
})
export class CityStaffHomeComponent implements OnInit {
  private IssuePetition: 'IssuePetition' = 'IssuePetition';
  private CandidatePetition: 'CandidatePetition' = 'CandidatePetition';
  private AddressData: 'AddressData' = 'AddressData';
  private SignatureSummary: 'SignatureSummary' = 'SignatureSummary';
  protected username: string = '';
  protected resultData: ResponsePetition[] = [
    {
      dataIssue: {
        __typename: this.IssuePetition,
        PK: '0',
        createdAt: '00/00/0000',
        detail:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
        owner: 'CommitteUser-1',
        signatureSummary: {
          __typename: this.SignatureSummary,
          approved: 15000,
          deadline: '00/00/0000',
          required: 24000,
          submitted: 20000,
        },
        status: PetitionStatus.NEW,
        title: 'Title1',
        type: PetitionType.ISSUE,
      },
    },
    {
      dataIssue: {
        __typename: this.IssuePetition,
        PK: '0',
        createdAt: '00/00/0000',
        detail:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
        owner: 'CommitteUser-1',

        status: PetitionStatus.NEW,
        title: 'Title1',
        type: PetitionType.ISSUE,
      },
    },
    {
      dataCandidate: {
        __typename: this.CandidatePetition,
        PK: '0',
        address: {
          __typename: this.AddressData,
          address: 'address',
          city: 'city',
          number: '22',
          state: 'Alaska',
          zipCode: '1200',
        },
        createdAt: '00/00/0000',
        office: '',
        owner: 'CommitteUser-1',
        party: 'Green',
        status: PetitionStatus.NEW,
        name: 'First name and last name',
        type: PetitionType.ISSUE,
      },
    },
  ];

  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error' | 'loadingUp'
  > = new BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error' | 'loadingUp'
  >('contents');
  protected disabledFilter: boolean = true;
  protected disabledSeeMore: boolean = true;
  private currentFilter: FilterData[] = [
    {
      property: 'Category',
      value: 'All',
      page: 0,
    },
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
  protected filterByCategory: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Ballot', value: 'issue', active: false },
    { name: 'Candidate', value: 'candidate', active: false },
  ];
  protected filterByStatus: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Pased', value: 'pased', active: false },
    { name: 'Failed', value: 'failed', active: false },
  ];
  constructor() {}

  ngOnInit(): void {}
}
