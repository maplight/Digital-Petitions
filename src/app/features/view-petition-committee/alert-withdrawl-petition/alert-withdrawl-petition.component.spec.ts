import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition.component';

describe('AlertWithdrawlPetitionComponent', () => {
  let component: AlertWithdrawlPetitionComponent;
  let fixture: ComponentFixture<AlertWithdrawlPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertWithdrawlPetitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertWithdrawlPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that the "dp-basic-alert" component exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('dp-basic-alert');
    expect(element).toBeTruthy();
  });

  it('evaluates that there are two buttons', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);
  });

  it('check that the alert message exists', () => {
    const element = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element[0].textContent).toEqual(
      'Once this has been withdrawn it can not be undone'
    );
  });
});
