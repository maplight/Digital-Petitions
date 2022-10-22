import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import {
  Signature,
  SignatureStatus,
  VerificationMethod,
} from 'src/app/core/api/API';

import { ViewSignaturesTableComponent } from './view-signatures-table.component';

describe('ViewSignaturesTableComponent', () => {
  let component: ViewSignaturesTableComponent;
  let fixture: ComponentFixture<ViewSignaturesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSignaturesTableComponent],
      imports: [CommonModule, MatTableModule, MatCheckboxModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('"elementChecked" function should return true when a unchecked item is clicked', () => {
    component.dataSource = _signatures;
    fixture.detectChanges();

    fixture.debugElement
      .queryAll(By.css('mat-checkbox'))[0]
      .triggerEventHandler('change');

    expect(component.elementChecked(_signatures[0])).toBeTrue();
  });

  it('"elementChecked" function should return false when a checked item is clicked', () => {
    component.dataSource = _signatures;
    fixture.detectChanges();

    fixture.debugElement
      .queryAll(By.css('mat-checkbox'))[0]
      .triggerEventHandler('change');

    expect(component.elementChecked(_signatures[1])).toBeFalse();
  });

  it('"emitSignaturesSelected" should emit an array of Signatures selected when some table item is clicked and exist selected signatures', (done) => {
    component.dataSource = _signatures;
    fixture.detectChanges();
    component.emitSignaturesSelected.asObservable().subscribe((data) => {
      expect(data).toEqual([_item]);
      done();
    });
    fixture.debugElement
      .queryAll(By.css('mat-checkbox'))[0]
      .triggerEventHandler('change');
  });
  it('"emitSignaturesSelected" should emit an empty array when some table item is clicked and not exist selected signatures', (done) => {
    component.dataSource = _signatures;
    fixture.detectChanges();
    component.event(_item);
    component.emitSignaturesSelected.asObservable().subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });

    fixture.debugElement
      .queryAll(By.css('mat-checkbox'))[0]
      .triggerEventHandler('change');
  });
});
const _item: Signature = {
  __typename: 'Signature',
  PK: '1',
  address: '',
  createdAt: '',
  isVerified: false,
  method: VerificationMethod.CALL,
  name: '',
  signer: '',
  status: SignatureStatus.APPROVED,
  updatedAt: '',
};
const _item2: Signature = {
  __typename: 'Signature',
  PK: '2',
  address: '',
  createdAt: '',
  isVerified: false,
  method: VerificationMethod.CALL,
  name: '',
  signer: '',
  status: SignatureStatus.APPROVED,
  updatedAt: '',
};
const _signatures: Signature[] = [
  _item,
  _item2,
  _item2,
  _item2,
  _item2,
  _item2,
  _item2,
  _item2,
];
