import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeComponent } from './committee.component';

describe('CommitteeComponent', () => {
  let component: CommitteeComponent;
  let fixture: ComponentFixture<CommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
