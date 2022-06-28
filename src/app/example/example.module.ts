import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';
import { ExampleMaterialModule } from './example-material.module';

@NgModule({
  declarations: [ExampleComponent],
  imports: [CommonModule, ExampleRoutingModule, ExampleMaterialModule],
})
export class ExampleModule {}
