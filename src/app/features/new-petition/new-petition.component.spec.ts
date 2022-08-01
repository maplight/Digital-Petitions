import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetitionComponent } from './new-petition.component';

describe('NewPetitionComponent', () => {
  let component: NewPetitionComponent;
  let fixture: ComponentFixture<NewPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
