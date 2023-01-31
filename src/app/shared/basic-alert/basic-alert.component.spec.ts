import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { BasicAlertComponent } from './basic-alert.component';

describe('BasicModalComponent', () => {
  let component: BasicAlertComponent;
  let fixture: ComponentFixture<BasicAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicAlertComponent],
      imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a button', () => {
    let element = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toEqual(1);
  });

  it('should call a dialogRef close function when the close button is clicked', () => {
    let spyfunction = spyOn(dialogMock, 'close');
    let element = fixture.debugElement.query(By.css('button'));
    element.triggerEventHandler('click');
    expect(spyfunction).toHaveBeenCalled();
  });
});
const dialogMock = {
  close: () => {},
};
