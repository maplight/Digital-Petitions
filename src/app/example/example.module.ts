import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';
import { ExampleMaterialModule } from './example-material.module';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    ExampleMaterialModule,
    MatIconModule,
  ],
})
export class ExampleModule {}
