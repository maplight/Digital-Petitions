import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';

@Component({
  selector: 'dp-view-signatures-table',
  templateUrl: './view-signatures-table.component.html',
})
export class ViewSignaturesTableComponent implements OnInit {
  tableStyle = 'w-full';
  @Input() dataSource: SignaturesData[] = [];
  protected signaturesSelected: SignaturesData[] = [];
  @Output() emitSignaturesSelected: EventEmitter<SignaturesData[]> =
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
  event(value: SignaturesData) {
    value.selected = !value.selected;
    this.signaturesSelected = this.dataSource.filter((value) => value.selected);
    this.emitSignaturesSelected.emit(this.signaturesSelected);
  }
}
