import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { SortSignaturesModule } from './sort-signatures/sort-signatures.module';
import { ViewSignaturesAlertModule } from './view-signatures-alert/view-signatures-alert.module';
import { ViewSignaturesRoutingModule } from './view-signatures-routing.module';
import { ViewSignaturesTableModule } from './view-signatures-table/view-signatures-table.module';

import { ViewSignaturesComponent } from './view-signatures.component';

describe('ViewSignaturesComponent', () => {
  let component: ViewSignaturesComponent;
  let fixture: ComponentFixture<ViewSignaturesComponent>;

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
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
