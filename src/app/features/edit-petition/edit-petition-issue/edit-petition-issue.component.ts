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
import { IssuePetition } from 'src/app/core/api/API';
import { EditPetitionIssueService } from 'src/app/logic/petition/edit-petition-issue.service';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ConfirmEditPetitionComponent } from '../confirm-edit-petition/confirm-edit-petition.component';

@Component({
  selector: 'dp-edit-petition-issue',
  templateUrl: './edit-petition-issue.component.html',
})
export class EditPetitionIssueComponent implements OnInit, OnChanges {
  @Input() formData: ResponsePetition = {};
  @Output() _cancelEvent: EventEmitter<'1' | '21' | '22' | '3'> =
    new EventEmitter();
  @Output() _submitEvent: EventEmitter<IssuePetition> = new EventEmitter();
  protected result$;
  protected loading$;
  public formGroup!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog,
    private _editPetitionIssueLogic: EditPetitionIssueService
  ) {
    this.result$ = this._editPetitionIssueLogic.result$.pipe(
      tap((result) => {
        result.result ? this._submitEvent.emit(result.result) : null;
      }),
      shareReplay(1)
    );

    this.loading$ = this._editPetitionIssueLogic.loading$;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroup = this._fb.group({
      title: [this.formData.dataIssue?.title, [Validators.required]],
      text: [this.formData.dataIssue?.detail, [Validators.required]],
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

              this._editPetitionIssueLogic.editIssuePetition(

                this.formGroup.value
              );
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
