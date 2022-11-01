import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QualifiedBoxComponent } from './qualified-box.component';

describe('QualifiedBoxComponent', () => {
  let component: QualifiedBoxComponent;
  let fixture: ComponentFixture<QualifiedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualifiedBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QualifiedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should a button if showDownlodPacked is false', () => {
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(1);
  });

  it('should two buttons if showDownlodPacked is true', () => {
    component.showDownloadPacket = true;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(2);
  });
});
