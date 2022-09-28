import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Signature } from 'src/app/core/api/API';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';

@Component({
  selector: 'dp-view-signatures-table',
  templateUrl: './view-signatures-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSignaturesTableComponent implements OnInit {
  tableStyle = 'w-full';
  @Input() dataSource: Signature[] = [];
  protected signaturesSelected: Signature[] = [];
  @Output() emitSignaturesSelected: EventEmitter<Signature[]> =
    new EventEmitter();
  displayedColumns: string[] = [
    'check',
    'signer_name',
    'signer_date',
    'address',
    'email',
    'status',
  ];
  constructor() {}

  ngOnInit(): void {}

  event(value: Signature) {
    let pos = this.signaturesSelected.indexOf(value);
    if (pos > -1) {
      this.signaturesSelected = this.signaturesSelected.filter(
        (element) => element !== value
      );
    } else {
      this.signaturesSelected = this.signaturesSelected.concat(value);
    }
    this.emitSignaturesSelected.emit(this.signaturesSelected);
  }

  elementChecked(value: Signature): boolean {
    return this.signaturesSelected.indexOf(value) > -1;
  }
}
