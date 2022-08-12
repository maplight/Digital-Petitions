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
import { state, states } from 'src/app/core/states';
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
  protected currentSign: number | undefined = 0;
  protected totalSign: number | undefined;
  protected percent: number = 0;

  public formGroup: FormGroup;
  protected localStates: state[] = states;
  @Input() offices: string[] = ['Office-1', 'Office-2', 'Office-3', 'Office-4'];
  @Input() parties: string[] = ['Party-1', 'Party-2', 'Party-3', 'Party-4'];

  @Output() cancelEvent: EventEmitter<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  > = new EventEmitter<
    'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error'
  >();
  @Output() submitEvent: EventEmitter<SignaturePetitionData> =
    new EventEmitter<SignaturePetitionData>();

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      fullName: [this.dataSignature.fullName, [Validators.required]],
      address: [this.dataSignature.address, [Validators.required]],
      city: [this.dataSignature.city, [Validators.required]],
      state: [this.dataSignature.state, [Validators.required]],
      zipCode: [this.dataSignature.zipCode, [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value);
    }
  }
  cancel(value: 'loading' | 'verify' | 'empty' | 'view' | 'sign' | 'error') {
    this.cancelEvent.emit(value);
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.data.dataCandidate) {
      this.currentSign = this.data.dataCandidate.atributes?.currentSign;
      this.totalSign = this.data.dataCandidate.atributes?.totalSign;
    } else if (!!this.data.dataIssue) {
      this.currentSign = this.data.dataIssue.atributes?.currentSign;
      this.totalSign = this.data.dataIssue.atributes?.totalSign;
    }
    if (!!this.currentSign && !!this.totalSign) {
      this.percent = (this.currentSign / this.totalSign) * 100;
    }
  }
}
