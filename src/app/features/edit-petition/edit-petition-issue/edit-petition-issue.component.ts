import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, shareReplay, tap } from 'rxjs';
import { EditPetitionIssueService } from 'src/app/logic/petition/edit-petition-issue.service';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';
import { ConfirmEditPetitionComponent } from '../confirm-edit-petition/confirm-edit-petition.component';

@Component({
  selector: 'dp-edit-petition-issue',
  templateUrl: './edit-petition-issue.component.html',
})
export class EditPetitionIssueComponent implements OnInit {
  @Input() formData: IssuePetitionData = {
    title: '',
    text: '',
  };
  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<IssuePetitionData> = new EventEmitter();
  protected result$;
  protected loading$;
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog,
    private _editPetitionIssueLogic: EditPetitionIssueService
  ) {
    this.formGroup = this._fb.group({
      title: [this.formData.title, [Validators.required]],
      text: [this.formData.text, [Validators.required]],
    });
    this.result$ = this._editPetitionIssueLogic.result$.pipe(
      tap((result) => {
        result.result ? this._submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );
    this.loading$ = this._editPetitionIssueLogic.loading$;
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
              this._editPetitionIssueLogic.formGroupValue =
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
