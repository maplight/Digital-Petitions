import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BasicFilterComponent],
  imports: [CommonModule, MatChipsModule, FormsModule, ReactiveFormsModule],
  exports: [BasicFilterComponent],
})
export class BasicFilterModule {}
