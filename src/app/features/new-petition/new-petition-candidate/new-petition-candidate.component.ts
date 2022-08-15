import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { CandidatePetition } from 'src/app/core/api/API';
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
  @Input() offices: string[] = ['Office-1', 'Office-2', 'Office-3', 'Office-4'];
  @Input() parties: string[] = ['Party-1', 'Party-2', 'Party-3', 'Party-4'];

  @Output() cancelEvent: EventEmitter<
    'type' | 'issue' | 'candidate' | 'result'
  > = new EventEmitter();
  @Output() submitEvent: EventEmitter<CandidatePetition> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _newPetitionCandidateLogic: NewPetitionCandidateService
  ) {
    this.formGroup = this._fb.group({
      name: ['', [Validators.required]],
      office: ['', [Validators.required]],
      party: ['', [Validators.required]],
      address: this._fb.group({
        address: ['', [Validators.required]],
        number: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }),
    });
    this.result$ = this._newPetitionCandidateLogic.result$.pipe(
      tap((result) => {
        result.result ? this.submitEvent.emit(result.result) : null;
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
    this.cancelEvent.emit('type');
  }
}
