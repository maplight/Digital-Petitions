import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCommitteeComponent } from './sign-up-committee.component';

describe('SingUpComponent', () => {
  let component: SignUpCommitteeComponent;
  let fixture: ComponentFixture<SignUpCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpCommitteeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
