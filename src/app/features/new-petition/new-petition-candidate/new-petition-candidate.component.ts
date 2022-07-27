import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { state, states } from 'src/app/core/states';
import { NewPetitionCandidateService } from 'src/app/logic/petition/exports';
import { CandidatePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition-candidate',
  templateUrl: './new-petition-candidate.component.html',
})
export class NewPetitionCandidateComponent implements OnInit {
  public formGroup: FormGroup;
  protected result$;
  protected loading$;
  protected localStates: state[] = states;

  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<CandidatePetitionData> =
    new EventEmitter();

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _newPetitionCandidateLogic: NewPetitionCandidateService
  ) {
    this.formGroup = this._fb.group({
      fullName: ['', [Validators.required]],
      office: ['', [Validators.required]],
      party: ['', [Validators.required]],
      address: ['', [Validators.required]],
      aptNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
    this.result$ = this._newPetitionCandidateLogic.result$.pipe(
      tap((result) => {
        result.result ? this._submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );
    this.loading$ = this._newPetitionCandidateLogic.loading$;
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionCandidateLogic.formGroupValue = this.formGroup.value;
    }
  }
  cancel() {
    this._cancelEvent.emit('1');
  }
}
