import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPetitionComponent } from './result-petition.component';

describe('ResultPetitionComponent', () => {
  let component: ResultPetitionComponent;
  let fixture: ComponentFixture<ResultPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
