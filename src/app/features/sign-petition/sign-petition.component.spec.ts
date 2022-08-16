import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPetitionComponent } from './sign-petition.component';

describe('SignPetitionComponent', () => {
  let component: SignPetitionComponent;
  let fixture: ComponentFixture<SignPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
