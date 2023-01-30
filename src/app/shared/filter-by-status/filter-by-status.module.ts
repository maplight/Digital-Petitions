import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByStatusComponent } from './filter-by-status.component';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [FilterByStatusComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [FilterByStatusComponent],
})
export class FilterByStatusModule {}
