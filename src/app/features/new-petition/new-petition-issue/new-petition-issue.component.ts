import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Component({
  selector: 'dp-new-petition-issue',
  templateUrl: './new-petition-issue.component.html',
})
export class NewPetitionIssueComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private _router: Router, private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {}
  cancel() {
    this._router.navigate(['new-petition']);
  }
}
