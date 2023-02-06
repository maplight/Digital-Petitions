import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTypePetitionComponent } from './select-type-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
