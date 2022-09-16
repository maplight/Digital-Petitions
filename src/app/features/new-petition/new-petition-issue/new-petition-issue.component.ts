import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil, Subject, tap } from 'rxjs';
import { IssuePetition } from 'src/app/core/api/API';
import { NewPetitionIssueService } from 'src/app/logic/petition/exports';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';

@Component({
  selector: 'dp-new-petition-issue',
  templateUrl: './new-petition-issue.component.html',
  providers: [NewPetitionIssueService],
})
export class NewPetitionIssueComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  protected success$!: Observable<IssuePetition | undefined>;
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  private _unSubscribeAll: Subject<void> = new Subject();
  @Output() cancelEvent: EventEmitter<
    'type' | 'issue' | 'candidate' | 'result'
  > = new EventEmitter();
  @Output() submitEvent: EventEmitter<IssuePetition> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _newPetitionIssueLogic: NewPetitionIssueService
  ) {
    this.formGroup = this._fb.group({
      title: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this._unSubscribeAll.next();
    this._unSubscribeAll.complete();
  }

  ngOnInit(): void {
    this._newPetitionIssueLogic.success$
      .pipe(takeUntil(this._unSubscribeAll))
      .subscribe((result) => {
        this.submitEvent.emit(result);
      });

    this.loading$ = this._newPetitionIssueLogic.loading$;
    this.error$ = this._newPetitionIssueLogic.error$;
  }

  submit() {
    if (this.formGroup.valid) {
      this._newPetitionIssueLogic.newIssuePetition(this.formGroup.value);
    }
  }

  cancel() {
    this.cancelEvent.emit('type');
  }
}
