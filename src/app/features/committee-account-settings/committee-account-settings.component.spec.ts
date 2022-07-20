import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeAccountSettingsComponent } from './committee-account-settings.component';

describe('CommitteeAccountSettingsComponent', () => {
  let component: CommitteeAccountSettingsComponent;
  let fixture: ComponentFixture<CommitteeAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitteeAccountSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitteeAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
