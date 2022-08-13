import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSignPetitionComponent } from './result-sign-petition.component';

describe('ResultSignPetitionComponent', () => {
  let component: ResultSignPetitionComponent;
  let fixture: ComponentFixture<ResultSignPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSignPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultSignPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
