import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';
import { CityStaffSiteDesignRoutingModule } from './city-staff-site-design-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { MatButtonModule } from '@angular/material/button';
import { ImagePickerModule } from './image-picker/image-picker.module';

@NgModule({
  declarations: [CityStaffSiteDesignComponent],
  imports: [
    CommonModule,
    CityStaffSiteDesignRoutingModule,
    ReturnLinkModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ColorPickerModule,
    PetitionCardModule,
    MatButtonModule,
    ImagePickerModule,
  ],
})
export class CityStaffSiteDesignModule {}
