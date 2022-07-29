import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
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
  protected result$!: Observable<Result<string>>;
  protected loading$!: Observable<boolean>;
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog
  ) {
    this.formGroup = this._fb.group({
      title: [this.formData.title, [Validators.required]],
      text: [this.formData.text, [Validators.required]],
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
