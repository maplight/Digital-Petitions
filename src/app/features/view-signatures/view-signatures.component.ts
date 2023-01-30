import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import {
  PetitionStatusQuery,
  Signature,
  SignaturesByPetitionInput,
  SignatureStatus,
  SignatureStatusQuery,
} from 'src/app/core/api/API';
import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';
import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';
import {
  FilterByStatus,
  FilterByStatusSignatures,
} from 'src/app/shared/models/filter/filter-by-status';

@Component({
  selector: 'dp-view-signatures',
  templateUrl: './view-signatures.component.html',
  providers: [
    GetSignaturesService,
    ApproveSignatureService,
    DenySignatureService,
  ],
})
export class ViewSignaturesComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void> = new Subject();

  protected showAlert: boolean = false;
  protected typeAlert: 'alert' | 'success' | 'error' = 'alert';
  protected messageAlert: string = '';
  protected disabledFilter: boolean = false;
  protected disabledSeeMore: boolean = false;
  protected id?: string;

  private _signaturesByPetitionInput: SignaturesByPetitionInput = {
    petition: '',
    status: null,
  };
  protected sortBy: {
    name: string;
    value: 'name' | 'createdAt' | 'address' | 'signer' | 'status';
    active: boolean;
  }[] = [
    { name: 'Signer Name', value: 'name', active: false },
    { name: 'Signer Date', value: 'createdAt', active: false },
    { name: 'Address', value: 'address', active: false },
    { name: 'Signer', value: 'signer', active: false },
    { name: 'Status', value: 'status', active: false },
  ];
  protected filterByStatus: FilterByStatus[] = FilterByStatusSignatures;

  protected items: Signature[] = [];
  protected signaturesSelected: Signature[] = [];
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loadingGetSignatures$!: Observable<boolean>;
  protected loadingApprove$!: Observable<boolean>;
  protected loadingDeny$!: Observable<boolean>;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _getSignatureLogic: GetSignaturesService,
    private _approveLogic: ApproveSignatureService,
    private _denyLogic: DenySignatureService
  ) {}

  ngOnInit(): void {
    //get signatures
    this._getSignatureLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;

        this.items = this.items.concat(result?.items ?? []);
        this.typeAlert = 'alert';
        this.messageAlert =
          this.items.length > 1
            ? 'You have ' + this.items.length + ' signatures that need review'
            : 'You have ' + this.items.length + ' signature that need review';
        this.showAlert = true;
      });
    //approve signature
    this._approveLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;
        this.typeAlert = 'success';
        this.messageAlert = result + ' Signature Successfully Approved';
        this.showAlert = true;
        this.items = [];
        this.signaturesSelected = [];
        this.getSignatures();
      });
    //deny signature
    this._denyLogic.success$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.disabledFilter = false;

        this.typeAlert = 'success';
        this.messageAlert = result + ' Signature Successfully Denied';
        this.showAlert = true;
        this.items = [];
        this.signaturesSelected = [];
        this.getSignatures();
      });
    this.loadingGetSignatures$ = this._getSignatureLogic.loading$;
    this.loadingApprove$ = this._approveLogic.loading$;
    this.loadingDeny$ = this._denyLogic.loading$;
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this._signaturesByPetitionInput.petition = id))
      )
      .subscribe(() => this.getSignatures());
  }
  setSignaturesSelected(data: Signature[]) {
    this.signaturesSelected = data;
  }

  sort(value: 'name' | 'createdAt' | 'address' | 'signer' | 'status') {
    this.items = [
      ...this.items.sort((a, b) => {
        return a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
      }),
    ];
  }

  approve() {
    this._approveLogic.approveSignature({
      signatureId: this.signaturesSelected[0].PK,
    });
  }

  deny() {
    this._denyLogic.denySignature({
      signatureId: this.signaturesSelected[0].PK,
    });
  }

  filterStatus(value: SignatureStatusQuery | PetitionStatusQuery) {
    this.items = [];
    this._signaturesByPetitionInput.status = value as SignatureStatusQuery;
    this.getSignatures();
  }

  pageNumber() {
    this.getSignatures();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private getSignatures() {
    this._getSignatureLogic.getSignatures(this._signaturesByPetitionInput);
  }
}
