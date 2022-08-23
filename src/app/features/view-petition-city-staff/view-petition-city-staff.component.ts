import { Component, OnInit } from '@angular/core';

import {
  CandidatePetition,
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';

import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-view-petition-city-staff',
  templateUrl: './view-petition-city-staff.component.html',
})
export class ViewPetitionCityStaffComponent implements OnInit {
  private IssuePetition: 'IssuePetition' = 'IssuePetition';
  private CandidatePetition: 'CandidatePetition' = 'CandidatePetition';
  private AddressData: 'AddressData' = 'AddressData';
  private SignatureSummary: 'SignatureSummary' = 'SignatureSummary';
  protected resultData: ResponsePetition = {
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
  };

  protected petition: IssuePetition | CandidatePetition | undefined;
  constructor() {}

  ngOnInit(): void {
    this.setState();
  }
  private setState() {
    this.petition = this.resultData.dataCandidate
      ? this.resultData.dataCandidate
      : this.resultData.dataIssue
      ? this.resultData.dataIssue
      : undefined;
  }
  submit() {}
}
