import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTypePetitionComponent } from './select-type-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SelectTypePetitionComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [SelectTypePetitionComponent],
})
export class SelectTypePetitionModule {}
