import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { state, states } from 'src/app/core/states';
import { CandidatePetitionData, Result } from 'src/app/shared/models/exports';
import { ConfirmEditPetitionComponent } from '../confirm-edit-petition/confirm-edit-petition.component';

@Component({
  selector: 'dp-edit-petition-candidate',
  templateUrl: './edit-petition-candidate.component.html',
})
export class EditPetitionCandidateComponent implements OnInit {
  @Input() formData: CandidatePetitionData = {
    fullName: '',
    office: '',
    party: '',
    address: '',
    aptNumber: '',
    city: '',
    state: { name: '', value: '' },
    zipCode: '',
  };
  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<CandidatePetitionData> =
    new EventEmitter();
  protected localStates: state[] = states;
  protected result$!: Observable<Result<string>>;
  protected loading$!: Observable<boolean>;
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog
  ) {
    this.formGroup = this._fb.group({
      fullName: [this.formData.fullName, [Validators.required]],
      office: [this.formData.office, [Validators.required]],
      party: [this.formData.party, [Validators.required]],
      address: [this.formData.address, [Validators.required]],
      aptNumber: [this.formData.aptNumber, [Validators.required]],
      city: [this.formData.city, [Validators.required]],
      state: [this.formData.state, [Validators.required]],
      zipCode: [this.formData.zipCode, [Validators.required]],
    });
  }

  ngOnInit(): void {}
  submit() {
    if (this.formGroup.valid) {
      const dialogRef = this._dialog.open(ConfirmEditPetitionComponent, {
        width: '480px',
      });
      dialogRef
        .afterClosed()
        .pipe(
          tap((response) => {
            if (response) {
              console.log('send form here');
            }
          })
        )
        .subscribe();
    }
  }
  cancel() {
    this._cancelEvent.emit();
  }
}
