import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';
import { ExampleMaterialModule } from './example-material.module';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    ExampleMaterialModule,
    MatIconModule,
    /*
    HeroIconModule.forRoot(
      {
        menu,
        annotation,
      },
      {
        defaultHostDisplay: 'inlineBlock', // default 'none'
        attachDefaultDimensionsIfNoneFound: true, // default 'false'
      }
    ),
    */
  ],
})
export class ExampleModule {}
