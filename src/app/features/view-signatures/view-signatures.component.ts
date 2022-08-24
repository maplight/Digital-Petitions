import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { from, merge, Observable, of, Subscription } from 'rxjs';
import { ApproveSignatureService } from 'src/app/logic/signature/approve-signature.service';
import { DenySignatureService } from 'src/app/logic/signature/deny-signature.service';
import { GetSignaturesService } from 'src/app/logic/signature/get-signatures.service';
import { FilterData } from 'src/app/shared/models/exports';
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';

@Component({
  selector: 'dp-view-signatures',
  templateUrl: './view-signatures.component.html',
})
export class ViewSignaturesComponent
  implements OnInit, AfterViewInit, OnChanges
{
  protected showAlert: boolean = false;
  protected typeAlert: 'alert' | 'success' | 'error' = 'alert';
  protected messageAlert: string = '';
  protected disabledFilter: boolean = false;
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
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Signer Name', value: 'Signer Name', active: false },
    { name: 'Signer Date', value: 'Signer Date', active: false },
    { name: 'Address', value: 'Address', active: false },
    { name: 'Email', value: 'Email', active: false },
    { name: 'Status', value: 'Status', active: false },
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
  protected loading$!: Observable<boolean>;
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
    this._getSignatureLogic.result$.subscribe((result) => {
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
    this._approveLogic.result$.subscribe((result) => {
      this.disabledFilter = false;

      if (!!result.result) {
        this.typeAlert = 'alert';
        this.messageAlert = result.result + ' Signatures Successfully Approved';
        this.showAlert = true;
        this.resultData = [];
        this.signaturesSelected = [];
        this._getSignatureLogic.getSignatures(this.currentFilter);
      } else {
        this.typeAlert = 'alert';
        this.messageAlert = 'Error: ' + result.error;
        this.showAlert = true;
      }
    });
    //deny signature
    this._denyLogic.result$.subscribe((result) => {
      this.disabledFilter = false;

      if (!!result.result) {
        this.typeAlert = 'alert';
        this.messageAlert = result.result + ' Signatures Successfully Denied';
        this.showAlert = true;
        this.resultData = [];
        this.signaturesSelected = [];
        this._getSignatureLogic.getSignatures(this.currentFilter);
      } else {
        this.typeAlert = 'alert';
        this.messageAlert = 'Error: ' + result.error;
        this.showAlert = true;
      }
    });
    this.loading$ = merge(
      this._getSignatureLogic.loading$,
      this._approveLogic.loading$,
      this._denyLogic.loading$
    );
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
  search(value: string) {}
  sort(value: string) {}
  filterStatus(value: string) {}
}
