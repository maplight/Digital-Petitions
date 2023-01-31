import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CityStaffAdminRoutingModule } from './city-staff-admin-routing.module';

import { CityStaffAdminComponent } from './city-staff-admin.component';

describe('AdminComponent', () => {
  let component: CityStaffAdminComponent;
  let fixture: ComponentFixture<CityStaffAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffAdminComponent],
      imports: [
        CommonModule,
        CityStaffAdminRoutingModule,
        MatButtonModule,
        RouterModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(CityStaffAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show two buttons in the view', () => {
    let elements =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(elements.length).toEqual(2);
  });

  it('should show the title Site Admin', () => {
    let elements = fixture.debugElement.nativeElement.querySelectorAll('h2');
    expect(elements[0].textContent).toEqual('Site Admin');
  });
});
