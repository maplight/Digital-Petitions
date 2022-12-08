import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';
import { CityStaffSiteDesignRoutingModule } from './city-staff-site-design-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ImagePickerModule } from './image-picker/image-picker.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [CityStaffSiteDesignComponent],
  imports: [
    CommonModule,
    CityStaffSiteDesignRoutingModule,
    ReturnLinkModule,
    MatInputModule,
    MatIconModule,
    ColorPickerModule,
    PetitionCardModule,
    MatButtonModule,
    ImagePickerModule,
    ErrorMsgModule,
    LoadingBarModule,
  ],
})
export class CityStaffSiteDesignModule {}
