import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetType } from 'src/app/core/api/API';
import { GetImageDataService } from 'src/app/logic/admin/get-image-data.service';
import { GetUrlDataService } from 'src/app/logic/admin/get-url-data.service';
import { SetImageDataService } from 'src/app/logic/admin/set-image-data.service';
import { Observable, merge } from 'rxjs';

@Component({
  selector: 'dp-image-picker',
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent implements OnInit {
  protected formGroup: FormGroup;

  protected selectedStyle: string = '';
  protected unSelectedStyle: string = '';

  protected imageSrc: { img: string; active: boolean }[] = [];

  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;

  @Output() eventImg: EventEmitter<string> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _setImgLogic: SetImageDataService,
    private _getImgLogic: GetImageDataService,
    private _getUrlLogic: GetUrlDataService
  ) {
    this.formGroup = this._fb.group({
      logo: null,
      fileSource: ['', [Validators.required]],
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this._getUrlLogic.formGroupValue();
    this._getUrlLogic.success$.subscribe((data) => {
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;

        reader.readAsDataURL(file);

        reader.onload = () => {
          if (typeof data === 'string') {
            this._setImgLogic.setImageData({
              url: data,
              img: reader.result as ArrayBuffer,
            });
          }
        };
      }
    });
  }

  onClickImg(value: { img: string; active: boolean }) {
    this.imageSrc.forEach((item) => {
      item.active = item === value;
    });
    this.eventImg.emit(value.img);
  }

  private addItem(value: string[]) {
    this.imageSrc.forEach((item) => {
      item.active = false;
    });
    value.forEach((data) => {
      this.imageSrc.push({ img: data, active: false });
    });
  }

  ngOnInit(): void {
    this.error$ = merge(
      this._getImgLogic.error$,
      this._setImgLogic.error$,
      this._getUrlLogic.error$
    );

    this.loading$ = merge(
      this._getImgLogic.loading$,
      this._setImgLogic.loading$,
      this._getUrlLogic.loading$
    );

    this._setImgLogic.success$.subscribe((_) => {
      this._getImgLogic.formGroupValue({ type: AssetType.LOGO });
    });

    this._getImgLogic.success$.subscribe((data) => {
      if (!!data) {
        this.addItem(data.items);
      }
    });

    this._getImgLogic.formGroupValue({ type: AssetType.LOGO });

    this.imageSrc.forEach((value) => {
      if (value.active) {
        this.eventImg.emit(value.img);
      }
    });
  }
}
