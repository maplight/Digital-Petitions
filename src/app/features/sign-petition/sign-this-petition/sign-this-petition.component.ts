import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, merge } from 'rxjs';
import {
  SignatureSummary,
  VoterRecordMatch,
  VoterRecordMatchInput,
} from 'src/app/core/api/API';
import { State, states } from 'src/app/core/states';
import { VoterRecordMatchService } from 'src/app/logic/petition/voter-record-match.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-sign-this-petition',
  templateUrl: './sign-this-petition.component.html',
  providers: [VoterRecordMatchService],
})
export class SignThisPetitionComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};
  @Input() dataSignature: VoterRecordMatch = {
    __typename: 'VoterRecordMatch',
    methods: [],
    address: '',
    city: '',
    fullName: '',
    state: '',
    zipCode: '',
  };
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected formGroup: FormGroup;
  protected localStates: State[] = states;
  private localError$: Subject<string> = new Subject();

  @Output() cancelEvent: EventEmitter<'verify' | 'view' | 'sign'> =
    new EventEmitter<'verify' | 'view' | 'sign'>();
  @Output() submitEvent: EventEmitter<VoterRecordMatch> =
    new EventEmitter<VoterRecordMatch>();
  protected signatureSummary: SignatureSummary | null | undefined;

  constructor(
    private _fb: FormBuilder,
    private _getVoterRecordMatchLogic: VoterRecordMatchService
  ) {
    this.formGroup = this._fb.group({
      fullName: [this.dataSignature.fullName, [Validators.required]],
      address: [this.dataSignature.address, [Validators.required]],
      city: [this.dataSignature.city, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [this.dataSignature.zipCode, [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let signerData: VoterRecordMatchInput = {
        address: this.formGroup.value.address,
        city: this.formGroup.value.city,
        state: this.formGroup.value.state,
        fullName: this.formGroup.value.fullName,
        zipCode: this.formGroup.value.zipCode,
      };
      this._getVoterRecordMatchLogic.getVoterRecordMatch(signerData);
    }
  }
  cancel(value: 'verify' | 'view' | 'sign') {
    this.cancelEvent.emit(value);
  }

  ngOnInit(): void {
    this.loading$ = this._getVoterRecordMatchLogic.loading$;
    this.error$ = merge(
      this._getVoterRecordMatchLogic.error$,
      this.localError$
    );
    this._getVoterRecordMatchLogic.success$.subscribe((data) => {
      if (data?.token != null) {
        this.submitEvent.emit(data);
      } else {
        this.localError$.next('We have not found matches for the data offered');
      }
    });
  }

  ngOnChanges(changes?: SimpleChanges): void {
    this.signatureSummary = this.data.dataCandidate
      ? this.data.dataCandidate.signatureSummary
      : this.data.dataIssue
      ? this.data.dataIssue.signatureSummary
      : undefined;
    this.formGroup = this._fb.group({
      fullName: [this.dataSignature.fullName, [Validators.required]],
      address: [this.dataSignature.address, [Validators.required]],
      city: [this.dataSignature.city, [Validators.required]],
      state: [this.dataSignature.state, [Validators.required]],
      zipCode: [this.dataSignature.zipCode, [Validators.required]],
    });
  }
}
