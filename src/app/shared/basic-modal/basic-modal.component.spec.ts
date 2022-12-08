import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BasicModalComponent } from './basic-modal.component';

describe('BasicModalComponent', () => {
  let component: BasicModalComponent;
  let fixture: ComponentFixture<BasicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicModalComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show three buttons', () => {
    let element = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toEqual(3);
  });

  it('should call a dialogRef close function when the close button is clicked', () => {
    let spyfunction = spyOn(dialogMock, 'close');
    let element = fixture.debugElement.query(By.css('button'));
    element.triggerEventHandler('click');
    expect(spyfunction).toHaveBeenCalled();
  });
  it('should call a dialogRef close function when the cancel button is clicked', () => {
    let spyfunction = spyOn(dialogMock, 'close');
    let element = fixture.debugElement.queryAll(By.css('button'));
    element[1].triggerEventHandler('click');
    expect(spyfunction).toHaveBeenCalled();
  });

  it('sendEvent should emit when the send button is clicked', () => {
    component.sendEvent.asObservable().subscribe(() => {
      expect(true).toBeTrue();
    });
    let element = fixture.debugElement.queryAll(By.css('button'));
    element[2].triggerEventHandler('click');
  });
});
const dialogMock = {
  close: () => {},
};
