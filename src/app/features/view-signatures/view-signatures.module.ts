import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignaturesComponent } from './view-signatures.component';
import { ViewSignaturesRoutingModule } from './view-signatures-routing.module';
import { ViewSignaturesAlertModule } from './view-signatures-alert/view-signatures-alert.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { BasicFilterModule } from 'src/app/shared/basic-filter/basic-filter.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewSignaturesTableModule } from './view-signatures-table/view-signatures-table.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { MatButtonModule } from '@angular/material/button';
import { SortSignaturesModule } from './sort-signatures/sort-signatures.module';

@NgModule({
  declarations: [ViewSignaturesComponent],
  imports: [
    CommonModule,
    ViewSignaturesAlertModule,
    ViewSignaturesTableModule,
    ViewSignaturesRoutingModule,
    ReturnLinkModule,
    BasicSearchEngineModule,
    BasicFilterModule,
    MatCheckboxModule,
    LoadingBarModule,
    MatButtonModule,
    SortSignaturesModule,
  ],
})
export class ViewSignaturesModule {}
