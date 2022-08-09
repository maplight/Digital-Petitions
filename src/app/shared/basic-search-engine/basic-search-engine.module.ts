import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchEngineComponent } from './basic-search-engine.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BasicSearchEngineComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BasicSearchEngineComponent],
})
export class BasicSearchEngineModule {}
