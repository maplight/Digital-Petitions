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
import { Observable } from 'rxjs';
import { SignatureSummary } from 'src/app/core/api/API';
import { State, states } from 'src/app/core/states';
import { Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { SignaturePetitionData } from 'src/app/shared/models/petition/signature-petition-data';

@Component({
  selector: 'dp-sign-this-petition',
  templateUrl: './sign-this-petition.component.html',
})
export class SignThisPetitionComponent implements OnInit, OnChanges {
  @Input() data: ResponsePetition = {};
  @Input() dataSignature: SignaturePetitionData = {
    address: '',
    city: '',
    fullName: '',
    state: { name: '', value: '' },
    zipCode: '',
  };

  public formGroup: FormGroup;
  protected localStates: State[] = states;
  @Input() offices: string[] = ['Office-1', 'Office-2', 'Office-3', 'Office-4'];
  @Input() parties: string[] = ['Party-1', 'Party-2', 'Party-3', 'Party-4'];

  @Output() cancelEvent: EventEmitter<'verify' | 'view' | 'sign'> =
    new EventEmitter<'verify' | 'view' | 'sign'>();
  @Output() submitEvent: EventEmitter<SignaturePetitionData> =
    new EventEmitter<SignaturePetitionData>();
  protected signatureSummary: SignatureSummary | null | undefined;
  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      fullName: [this.dataSignature.fullName, [Validators.required]],
      address: [this.dataSignature.address, [Validators.required]],
      city: [this.dataSignature.city, [Validators.required]],
      state: [
        this.dataSignature.state.name === '' ? null : this.dataSignature.state,
        [Validators.required],
      ],
      zipCode: [this.dataSignature.zipCode, [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value);
    }
  }
  cancel(value: 'verify' | 'view' | 'sign') {
    this.cancelEvent.emit(value);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.signatureSummary = this.data.dataCandidate
      ? this.data.dataCandidate.signatureSummary
      : this.data.dataIssue
      ? this.data.dataIssue.signatureSummary
      : undefined;
  }
}
