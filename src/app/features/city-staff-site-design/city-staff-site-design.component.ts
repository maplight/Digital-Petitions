import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-city-staff-site-design',
  templateUrl: './city-staff-site-design.component.html',
})
export class CityStaffSiteDesignComponent implements OnInit {
  public formGroup: FormGroup;
  protected mockPetition: ResponsePetition = {
    dataIssue: {
      __typename: 'IssuePetition',
      title: 'Petition Title',
      detail:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?',
      createdAt: '00/00/0000',
      owner: '',
      PK: '',
      status: PetitionStatus.NEW,
      version: 0,
      type: PetitionType.ISSUE,
      updatedAt: '00/00/0000',
      signatures: { __typename: 'SignatureConnection', items: [] },
    },
  };
  protected headerColor!: string | null;
  protected buttonColor!: string | null;
  protected highlightColor!: string | null;
  protected logo!: string | null;

  protected defaultheaderColor: string | null = '#FFFFFF';
  protected defaultbuttonColor: string | null = '#FFFFFF';
  protected defaulthighlightColor: string | null = '#FFFFFF';

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      highlightColor: ['#FFFFFF', [Validators.required]],
      buttonColor: ['#FFFFFF', [Validators.required]],
      headerColor: ['#FFFFFF', [Validators.required]],
      logo: [[Validators.required]],
    });
  }

  ngOnInit(): void {}
  submit() {}
  setColor(data: string | null) {
    console.log(data);
  }
}
