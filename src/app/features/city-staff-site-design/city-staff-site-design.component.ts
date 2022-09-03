import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dp-city-staff-site-design',
  templateUrl: './city-staff-site-design.component.html',
})
export class CityStaffSiteDesignComponent implements OnInit {
  public formGroup: FormGroup;

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
}
