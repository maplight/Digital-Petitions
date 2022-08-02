import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypePetitionComponent } from './select-type-petition.component';

describe('SelectTypePetitionComponent', () => {
  let component: SelectTypePetitionComponent;
  let fixture: ComponentFixture<SelectTypePetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypePetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTypePetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
