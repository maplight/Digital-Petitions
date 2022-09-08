import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ImagePickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatRippleModule],
  exports: [ImagePickerComponent],
})
export class ImagePickerModule {}
