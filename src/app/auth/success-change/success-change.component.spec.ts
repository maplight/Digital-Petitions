import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SuccessChangeRoutingModule } from './success-change-routing.module';

import { SuccessChangeComponent } from './success-change.component';

describe('SuccessChangeComponent', () => {
  let component: SuccessChangeComponent;
  let fixture: ComponentFixture<SuccessChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessChangeComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatButtonModule,
        RouterModule,
        SuccessChangeRoutingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an "h1" element with the text Petition Creator', () => {
    let element = fixture.debugElement.nativeElement.querySelector('h1');
    expect(element.textContent).toEqual('Petition Creators');
  });

  it('should display an "h4" element with the text Password Reset', () => {
    let element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual('Password Reset');
  });

  it('should display an "p" element', () => {
    let element = fixture.debugElement.nativeElement.querySelector('p');
    expect(element.textContent).toEqual(
      ' Your password has been successfully reset. Click continue to login. '
    );
  });

  it('should display an "a" element', () => {
    let element = fixture.debugElement.nativeElement.querySelector('a');
    expect(element).toBeTruthy();
  });
});
