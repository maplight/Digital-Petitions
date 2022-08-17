import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shareReplay, tap } from 'rxjs';
import { IssuePetition } from 'src/app/core/api/API';
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

  @Output() cancelEvent: EventEmitter<
    'type' | 'issue' | 'candidate' | 'result'
  > = new EventEmitter();
  @Output() submitEvent: EventEmitter<IssuePetition> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _newPetitionIssueLogic: NewPetitionIssueService
  ) {
    this.formGroup = this._fb.group({
      title: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    });

    this.result$ = this._newPetitionIssueLogic.result$.pipe(
      tap((result) => {
        result.result ? this.submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );

    this.loading$ = this._newPetitionIssueLogic.loading$;
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionIssueLogic.newIssuePetition(this.formGroup.value);
    }
  }

  cancel() {
    this.cancelEvent.emit('type');
  }
}
