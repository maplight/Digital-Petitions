import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';

import { SelectTypePetitionComponent } from './select-type-petition.component';

describe('SelectTypePetitionComponent', () => {
  let component: SelectTypePetitionComponent;
  let fixture: ComponentFixture<SelectTypePetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectTypePetitionComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTypePetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show two radio buttons', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('mat-radio-button');
    expect(element.length).toBe(2);
  });

  it('should cancelEvent emit when cancel botton is clicked', () => {
    component.cancelEvent.asObservable().subscribe((_) => {
      expect(true).toBeTrue();
    });
    component.cancel();
  });

  it('"submitEvent" component should  emit correct object ("Issue") when submit botton is clicked', () => {
    component.submitEvent.asObservable().subscribe((data) => {
      expect(data).toEqual('Issue');
    });
    component.typePetition = 'Issue';
    component.submit();
  });

  it('"submitEvent" component should  emit correct object ("Candidate") when submit botton is clicked', () => {
    component.submitEvent.asObservable().subscribe((data) => {
      expect(data).toEqual('Candidate');
    });
    component.typePetition = 'Candidate';
    component.submit();
  });
});
