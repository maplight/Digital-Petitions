import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BasicModalModule } from '../basic-modal/basic-modal.module';

import { DialogResultComponent } from './dialog-result.component';

describe('DialogResultComponent', () => {
  let component: DialogResultComponent;
  let fixture: ComponentFixture<DialogResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResultComponent],
      imports: [CommonModule, MatIconModule, BasicModalModule, MatButtonModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'exampleTitle',
            message: 'exampleMessage',
            success: true,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show data received', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('h4').textContent
    ).toEqual(' exampleTitle ');
    expect(
      fixture.debugElement.nativeElement.querySelector('p').textContent
    ).toEqual(' exampleMessage ');
  });
});
const dialogMock = {
  close: () => {},
};
