import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [ExampleComponent, DialogExampleComponent],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ExampleModule {}
