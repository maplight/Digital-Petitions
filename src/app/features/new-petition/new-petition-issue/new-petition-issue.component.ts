import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { NewPetitionIssueService } from 'src/app/logic/petition/exports';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition-issue',
  templateUrl: './new-petition-issue.component.html',
})
export class NewPetitionIssueComponent implements OnInit {
  public formGroup: FormGroup;
  protected result$;
  protected loading$;

  @Output() _cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() _submitEvent: EventEmitter<IssuePetitionData> = new EventEmitter();

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _newPetitionIssueLogic: NewPetitionIssueService
  ) {
    this.formGroup = this._fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
    this.result$ = this._newPetitionIssueLogic.result$.pipe(
      tap((result) => {
        result.result ? this._submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );
    this.loading$ = this._newPetitionIssueLogic.loading$;
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionIssueLogic.formGroupValue = this.formGroup.value;
    }
  }
  cancel() {
    this._router.navigate(['new-petition']);
  }
}
