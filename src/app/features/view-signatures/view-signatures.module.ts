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
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { MatButtonModule } from '@angular/material/button';
import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';
import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';

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
    LoadingModule,
    MatButtonModule,
  ],
  providers: [
    GetSignaturesService,
    ApproveSignatureService,
    DenySignatureService,
  ],
})
export class ViewSignaturesModule {}
