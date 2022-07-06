import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpCommitteeComponent } from './sing-up-committee.component';

describe('SingUpComponent', () => {
  let component: SingUpCommitteeComponent;
  let fixture: ComponentFixture<SingUpCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingUpCommitteeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingUpCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
