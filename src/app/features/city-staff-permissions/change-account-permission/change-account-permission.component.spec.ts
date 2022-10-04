import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

import { ChangeAccountPermissionComponent } from './change-account-permission.component';

describe('ChangeAccountPermissionComponent', () => {
  let component: ChangeAccountPermissionComponent;
  let fixture: ComponentFixture<ChangeAccountPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeAccountPermissionComponent],
      imports: [
        CommonModule,
        BasicModalModule,
        LoadingBarModule,
        ErrorMsgModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DialogResultModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HttpClient,
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeAccountPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
const dialogMock = {
  close: () => {},
};
