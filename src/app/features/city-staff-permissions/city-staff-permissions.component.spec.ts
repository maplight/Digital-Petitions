import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ChangeAccountPermissionModule } from './change-account-permission/change-account-permission.module';
import { CityStaffPermissionsRoutingModule } from './city-staff-permissions-routing.module';

import { CityStaffPermissionsComponent } from './city-staff-permissions.component';
import { NewMemberModule } from './new-member/new-member.module';
import { RemoveMemberModule } from './remove-member/remove-member.module';

describe('CityStaffPermissionsComponent', () => {
  let component: CityStaffPermissionsComponent;
  let fixture: ComponentFixture<CityStaffPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffPermissionsComponent],
      imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        CityStaffPermissionsRoutingModule,
        MatMenuModule,
        LoadingBarModule,
        ErrorMsgModule,

        DialogModule,
        DialogResultModule,
        NewMemberModule,
        ChangeAccountPermissionModule,

        MatDialogModule,
        RemoveMemberModule,
      ],
      providers: [{ provide: HttpClient }],
    }).compileComponents();

    fixture = TestBed.createComponent(CityStaffPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
