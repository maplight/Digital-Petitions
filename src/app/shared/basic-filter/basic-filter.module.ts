import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [BasicFilterComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [BasicFilterComponent],
})
export class BasicFilterModule {}
