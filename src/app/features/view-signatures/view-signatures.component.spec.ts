import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  SignatureConnection,
  SignaturesByPetitionInput,
} from 'src/app/core/api/API';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { SortSignaturesModule } from './sort-signatures/sort-signatures.module';
import { ViewSignaturesAlertModule } from './view-signatures-alert/view-signatures-alert.module';
import { ViewSignaturesRoutingModule } from './view-signatures-routing.module';
import { ViewSignaturesTableModule } from './view-signatures-table/view-signatures-table.module';

import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';
import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';

import { ViewSignaturesComponent } from './view-signatures.component';

describe('ViewSignaturesComponent', () => {
  let component: ViewSignaturesComponent;
  let fixture: ComponentFixture<ViewSignaturesComponent>;
  let _getSignaturesService: GetSignaturesService;
  let _approveSignatureService: ApproveSignatureService;
  let _denySignatureService: DenySignatureService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    })
      .overrideComponent(ViewSignaturesComponent, {
        set: {
          providers: [
            {
              provide: GetSignaturesService,
              useClass: MockedGetSignaturesService,
            },
            {
              provide: ApproveSignatureService,
              useClass: MockedApproveSignatureService,
            },
            {
              provide: DenySignatureService,
              useClass: MockedDenySignatureService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(ViewSignaturesComponent);
    component = fixture.componentInstance;
    _getSignaturesService =
      fixture.debugElement.injector.get(GetSignaturesService);
    _approveSignatureService = fixture.debugElement.injector.get(
      ApproveSignatureService
    );
    _denySignatureService =
      fixture.debugElement.injector.get(DenySignatureService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockedGetSignaturesService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<SignatureConnection | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  getSignatures(filter: SignaturesByPetitionInput) {}
}

class MockedApproveSignatureService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  approveSignature(id: string[]) {}
}

class MockedDenySignatureService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  denySignature(id: string[]) {}
}
