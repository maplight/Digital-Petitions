import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountPermissionComponent } from './change-account-permission.component';

describe('ChangeAccountPermissionComponent', () => {
  let component: ChangeAccountPermissionComponent;
  let fixture: ComponentFixture<ChangeAccountPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAccountPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAccountPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
