import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchEngineComponent } from './basic-search-engine.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
