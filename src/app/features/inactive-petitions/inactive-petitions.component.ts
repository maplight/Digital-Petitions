import { Component, OnInit } from '@angular/core';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-inactive-petitions',
  templateUrl: './inactive-petitions.component.html',
})
export class InactivePetitionsComponent implements OnInit {
  protected resultData: ResponsePetition[] = [
    {
      dataIssue: {
        title: 'Title1',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas fugiat dicta omnis nulla nam, reprehenderit officia quo sit a recusandae animi maxime odit qui voluptatum, eaque quod dolorum non iusto!',
        atributes: {
          type: 'Issue',
          status: '',
          currentSign: 10000,
          totalSign: 30000,
        },
      },
    },
    {
      dataIssue: {
        title: 'Title2',
        text: 'Text2',
        atributes: {
          type: 'Issue',
          status: '',
          currentSign: 20000,
          totalSign: 30000,
        },
      },
    },
    {
      dataCandidate: {
        address: 'Address',
        aptNumber: '14',
        city: 'City',
        fullName: 'Denismay Concepcion Rosa',
        office: 'Office',
        party: 'Party',
        state: { name: 'Alaska', value: 'AL' },
        zipCode: '00000',
        atributes: {
          type: 'Candidate',
          status: '',
          currentSign: 20000,
          totalSign: 30000,
        },
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
