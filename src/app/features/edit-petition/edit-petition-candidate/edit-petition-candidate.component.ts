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
  @Input() formData: ResponsePetition = {
    dataCandidate: {
      id: 0,
      address: '',
      aptNumber: '',
      city: '',
      fullName: '',
      office: '',
      party: '',
      state: { name: '', value: '' },
      zipCode: '',
    },
    dataIssue: { id: 0, detail: '', title: '' },
  };
  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<CandidatePetitionData> =
    new EventEmitter();
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
    this.formGroup = this._fb.group({
      fullName: [this.formData.dataCandidate?.fullName, [Validators.required]],
      office: [this.formData.dataCandidate?.office, [Validators.required]],
      party: [this.formData.dataCandidate?.party, [Validators.required]],
      address: [this.formData.dataCandidate?.address, [Validators.required]],
      aptNumber: [
        this.formData.dataCandidate?.aptNumber,
        [Validators.required],
      ],
      city: [this.formData.dataCandidate?.city, [Validators.required]],
      state: [this.formData.dataCandidate?.state, [Validators.required]],
      zipCode: [this.formData.dataCandidate?.zipCode, [Validators.required]],
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
              this._editPetitionCandidateLogic.formGroupValue =
                this.formGroup.value;
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
