import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, shareReplay, tap } from 'rxjs';
import { IssuePetition } from 'src/app/core/api/API';
import { NewPetitionIssueService } from 'src/app/logic/petition/exports';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition-issue',
  templateUrl: './new-petition-issue.component.html',
})
export class NewPetitionIssueComponent implements OnInit {
  public formGroup: FormGroup;
  protected success$!: Observable<IssuePetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;

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
  }

  ngOnInit(): void {
    this.success$ = this._newPetitionIssueLogic.success$.pipe(
      tap((result) => {
        this.submitEvent.emit(result);
      }),
      shareReplay(1)
    );

    this.loading$ = this._newPetitionIssueLogic.loading$;
    this.error$ = this._newPetitionIssueLogic.error$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionIssueLogic.newIssuePetition(this.formGroup.value);
    }
  }

  cancel() {
    this.cancelEvent.emit('type');
  }
}
