import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, takeUntil, Subject } from 'rxjs';

import { CandidatePetition } from 'src/app/core/api/API';
import { State, states } from 'src/app/core/states';
import { NewPetitionCandidateService } from 'src/app/logic/petition/exports';
import { OFFICES, PARTIES } from 'src/app/shared/models/common/default_values';
import { CandidatePetitionData } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition-candidate',
  templateUrl: './new-petition-candidate.component.html',
  providers: [NewPetitionCandidateService],
})
export class NewPetitionCandidateComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  protected success$!: Observable<CandidatePetition | undefined>;
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected localStates: State[] = states;
  private _unSubscribeAll: Subject<void> = new Subject();
  @Input() offices: string[] = OFFICES;
  @Input() parties: string[] = PARTIES;

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
        number: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }),
    });
  }

  ngOnDestroy(): void {
    this._unSubscribeAll.next();
    this._unSubscribeAll.complete();
  }

  ngOnInit(): void {
    this._newPetitionCandidateLogic.success$
      .pipe(takeUntil(this._unSubscribeAll))
      .subscribe((data) => {
        this.submitEvent.emit(data);
      });
    this.loading$ = this._newPetitionCandidateLogic.loading$;
    this.error$ = this._newPetitionCandidateLogic.error$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionCandidateLogic.newCandidatePetition(
        this.formGroup.value
      );
    }
  }
  cancel() {
    this.cancelEvent.emit('type');
  }
}
