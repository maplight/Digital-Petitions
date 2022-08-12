import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignThisPetitionComponent } from './sign-this-petition.component';

describe('SignThisPetitionComponent', () => {
  let component: SignThisPetitionComponent;
  let fixture: ComponentFixture<SignThisPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignThisPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignThisPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
