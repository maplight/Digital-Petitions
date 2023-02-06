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

import { Observable, tap } from 'rxjs';
import { IssuePetition } from 'src/app/core/api/API';
import { EditPetitionIssueService } from 'src/app/logic/petition/edit-petition-issue.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ConfirmEditPetitionComponent } from '../confirm-edit-petition/confirm-edit-petition.component';

@Component({
  selector: 'dp-edit-petition-issue',
  templateUrl: './edit-petition-issue.component.html',
  providers: [EditPetitionIssueService],
})
export class EditPetitionIssueComponent implements OnInit, OnChanges {
  @Input() formData: ResponsePetition = {};
  @Output() _cancelEvent: EventEmitter<void> = new EventEmitter();
  @Output() _submitEvent: EventEmitter<IssuePetition> = new EventEmitter();
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  public formGroup!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    public _dialogRef: MatDialogRef<ConfirmEditPetitionComponent>,
    public _dialog: MatDialog,
    private _editPetitionIssueLogic: EditPetitionIssueService
  ) {
    this._editPetitionIssueLogic.success$.subscribe((result) => {
      this._submitEvent.emit(result);
    }),
      (this.loading$ = this._editPetitionIssueLogic.loading$);
  }
  ngOnChanges(changes?: SimpleChanges): void {
    this.formGroup = this._fb.group({
      title: [this.formData.dataIssue?.title, [Validators.required]],
      text: [this.formData.dataIssue?.detail, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      title: [this.formData.dataIssue?.title, [Validators.required]],
      text: [this.formData.dataIssue?.detail, [Validators.required]],
    });
  }
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
              if (this.formData.dataIssue) {
                this._editPetitionIssueLogic.editIssuePetition({
                  PK: this.formData.dataIssue.PK,
                  expectedVersion: this.formData.dataIssue.version,
                  title: this.formGroup.value.title,
                  detail: this.formGroup.value.text,
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
