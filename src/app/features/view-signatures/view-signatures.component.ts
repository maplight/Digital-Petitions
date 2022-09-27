import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';
import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';
import { FilterData } from 'src/app/shared/models/exports';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';

@Component({
  selector: 'dp-view-signatures',
  templateUrl: './view-signatures.component.html',
  providers: [
    GetSignaturesService,
    ApproveSignatureService,
    DenySignatureService,
  ],
})
export class ViewSignaturesComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  private _unsubscribeAll: Subject<void> = new Subject();

  protected showAlert: boolean = false;
  protected typeAlert: 'alert' | 'success' | 'error' = 'alert';
  protected messageAlert: string = '';
  protected disabledFilter: boolean = false;
  protected disabledSeeMore: boolean = false;
  private currentFilter: FilterData[] = [
    {
      property: 'Status',
      value: 'All',
      page: 0,
    },
    {
      property: 'Search',
      value: '',
      page: 0,
    },
  ];
  protected sortBy: {
    name: string;
    value: 'signer_name' | 'signer_date' | 'address' | 'email' | 'registered';
    active: boolean;
  }[] = [
    { name: 'Signer Name', value: 'signer_name', active: false },
    { name: 'Signer Date', value: 'signer_date', active: false },
    { name: 'Address', value: 'address', active: false },
    { name: 'Email', value: 'email', active: false },
    { name: 'Status', value: 'registered', active: false },
  ];
  protected filterByStatus: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Registered', value: 'registered', active: false },
    { name: 'Approved', value: 'approved', active: false },
    { name: 'Denied', value: 'denied', active: false },
  ];
  protected resultData: SignaturesData[] = [];
  protected signaturesSelected: SignaturesData[] = [];
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loadingGetSignatures$!: Observable<boolean>;
  protected loadingApprove$!: Observable<boolean>;
  protected loadingDeny$!: Observable<boolean>;
  constructor(
    private _getSignatureLogic: GetSignaturesService,
    private _approveLogic: ApproveSignatureService,
    private _denyLogic: DenySignatureService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {
    this._getSignatureLogic.getSignatures(this.currentFilter);
  }

  ngOnInit(): void {
    //get signatures
    this._getSignatureLogic.result$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;

        if (!!result.result) {
          this.resultData = this.resultData.concat(result.result);
          this.typeAlert = 'alert';
          this.messageAlert =
            this.resultData.length > 1
              ? 'You have ' +
                this.resultData.length +
                ' signature that need review'
              : 'You have ' +
                this.resultData.length +
                ' signatures that need review';
          this.showAlert = true;
        }
      });
    //approve signature
    this._approveLogic.result$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;

        if (!!result.result) {
          this.typeAlert = 'success';
          this.messageAlert =
            result.result + ' Signatures Successfully Approved';
          this.showAlert = true;
          this.resultData = [];
          this.signaturesSelected = [];
          this._getSignatureLogic.getSignatures(this.currentFilter);
        } else {
          this.typeAlert = 'error';
          this.messageAlert = 'Error: ' + result.error;
          this.showAlert = true;
        }
      });
    //deny signature
    this._denyLogic.result$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;

        if (!!result.result) {
          this.typeAlert = 'success';
          this.messageAlert = result.result + ' Signatures Successfully Denied';
          this.showAlert = true;
          this.resultData = [];
          this.signaturesSelected = [];
          this._getSignatureLogic.getSignatures(this.currentFilter);
        } else {
          this.typeAlert = 'error';
          this.messageAlert = 'Error: ' + result.error;
          this.showAlert = true;
        }
      });
    this.loadingGetSignatures$ = this._getSignatureLogic.loading$;
    this.loadingApprove$ = this._approveLogic.loading$;
    this.loadingDeny$ = this._denyLogic.loading$;
  }
  setSignaturesSelected(data: SignaturesData[]) {
    this.signaturesSelected = data;
  }
  approve() {
    this._approveLogic.approveSignature(
      this.signaturesSelected.map((value) => value.id)
    );
  }
  deny() {
    this._denyLogic.denySignature(
      this.signaturesSelected.map((value) => value.id)
    );
  }

  sort(
    value: 'signer_name' | 'signer_date' | 'address' | 'email' | 'registered'
  ) {
    this.resultData = [
      ...this.resultData.sort((a, b) => {
        return a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
      }),
    ];
  }

  filterStatus(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[1].value = value;
    this._getSignatureLogic.getSignatures(this.currentFilter);
  }

  pageNumber() {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[0].page += 1;
    this.currentFilter[1].page += 1;
    this.currentFilter[2].page += 1;
    this._getSignatureLogic.getSignatures(this.currentFilter);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  search(value: string) {
    if (value.length > 0) {
      this.disabledFilter = true;
      this.disabledSeeMore = true;
      this.currentFilter[1].value = value;
      this._getSignatureLogic.getSignatures(this.currentFilter);
    }
  }
}
