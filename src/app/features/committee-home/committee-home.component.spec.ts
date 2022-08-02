import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeHomeComponent } from './committee-home.component';

describe('CommitteeHomeComponent', () => {
  let component: CommitteeHomeComponent;
  let fixture: ComponentFixture<CommitteeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
