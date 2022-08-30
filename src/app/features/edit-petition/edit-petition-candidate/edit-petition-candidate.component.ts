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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, shareReplay, tap } from 'rxjs';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { state, states } from 'src/app/core/states';
import { EditPetitionCandidateService } from 'src/app/logic/petition/edit-petition-candidate.service';
import { CandidatePetitionData, Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ConfirmEditPetitionComponent } from '../confirm-edit-petition/confirm-edit-petition.component';

@Component({
  selector: 'dp-edit-petition-candidate',
  templateUrl: './edit-petition-candidate.component.html',
})
export class EditPetitionCandidateComponent implements OnInit, OnChanges {
  @Input() formData: ResponsePetition = {};
  @Input() offices: string[] = ['Office-1', 'Office-2', 'Office-3', 'Office-4'];
  @Input() parties: string[] = ['Party-1', 'Party-2', 'Party-3', 'Party-4'];

  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<CandidatePetition> = new EventEmitter();
  protected localStates: state[] = states;
  protected result$;
  protected loading$;
  public formGroup!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog,
    private _editPetitionCandidateLogic: EditPetitionCandidateService
  ) {
    this.result$ = this._editPetitionCandidateLogic.result$.pipe(
      tap((result) => {
        result.result ? this._submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );
    this.loading$ = this._editPetitionCandidateLogic.loading$;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formData);
    this.formGroup = this._fb.group({
      office: [this.formData.dataCandidate?.office, [Validators.required]],
      party: [this.formData.dataCandidate?.party, [Validators.required]],
      address: [
        this.formData.dataCandidate?.address.address,
        [Validators.required],
      ],
      aptNumber: [
        this.formData.dataCandidate?.address.number,
        [Validators.required],
      ],
      city: [this.formData.dataCandidate?.address.city, [Validators.required]],
      state: [
        this.formData.dataCandidate?.address.state,
        [Validators.required],
      ],
      zipCode: [
        this.formData.dataCandidate?.address.zipCode,
        [Validators.required],
      ],
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
              if (this.formData.dataCandidate) {
                this._editPetitionCandidateLogic.editCandidatePetition({
                  PK: this.formData.dataCandidate.PK,
                  expectedVersion: this.formData.dataCandidate.version,
                  office: this.formGroup.value.office,
                  party: this.formGroup.value.party,

                  address: {
                    address: this.formGroup.value.address,
                    state: this.formGroup.value.state,
                    city: this.formGroup.value.city,
                    number: this.formGroup.value.aptNumber,
                    zipCode: this.formGroup.value.zipCode,
                  },
                });
              }
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
