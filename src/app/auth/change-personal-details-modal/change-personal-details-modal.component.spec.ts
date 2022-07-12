import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePersonalDetailsModalComponent } from './change-personal-details-modal.component';

describe('ChangePersonalDetailsModalComponent', () => {
  let component: ChangePersonalDetailsModalComponent;
  let fixture: ComponentFixture<ChangePersonalDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePersonalDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePersonalDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
