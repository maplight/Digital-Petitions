import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignaturesComponent } from './view-signatures.component';
import { ViewSignaturesRoutingModule } from './view-signatures-routing.module';
import { ViewSignaturesAlertModule } from './view-signatures-alert/view-signatures-alert.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewSignaturesTableModule } from './view-signatures-table/view-signatures-table.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { MatButtonModule } from '@angular/material/button';

import { SortSignaturesModule } from './sort-signatures/sort-signatures.module';

import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';
import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';
import { FilterByCategoryComponent } from 'src/app/shared/filter-by-category/filter-by-category.component';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';

@NgModule({
  declarations: [ViewSignaturesComponent],
  imports: [
    CommonModule,
    ViewSignaturesAlertModule,
    ViewSignaturesTableModule,
    ViewSignaturesRoutingModule,
    ReturnLinkModule,
    BasicSearchEngineModule,
    FilterByCategoryModule,
    FilterByStatusModule,
    MatCheckboxModule,
    LoadingBarModule,
    MatButtonModule,
    SortSignaturesModule,
  ],
  providers: [
    GetSignaturesService,
    ApproveSignatureService,
    DenySignatureService,
  ],
})
export class ViewSignaturesModule {}
