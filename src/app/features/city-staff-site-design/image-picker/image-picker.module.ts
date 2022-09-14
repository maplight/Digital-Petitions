import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [ImagePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [ImagePickerComponent],
})
export class ImagePickerModule {}
