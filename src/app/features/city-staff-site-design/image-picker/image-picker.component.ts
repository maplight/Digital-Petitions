import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dp-image-picker',
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent implements OnInit {
  public formGroup: FormGroup;
  protected imageSrc: { img: string; active: boolean }[] = [];
  protected selectedStyle: string = '';
  protected unSelectedStyle: string = '';
  @Output() eventImg: EventEmitter<string> = new EventEmitter();
  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      logo: null,
      fileSource: ['', [Validators.required]],
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addItem(reader.result as string);

        this.formGroup.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }

  onClickImg(value: { img: string; active: boolean }) {
    this.imageSrc.forEach((item) => {
      item.active = item === value;
    });
    this.eventImg.emit(value.img);
  }

  private addItem(value: string) {
    this.imageSrc.forEach((item) => {
      item.active = false;
    });
    this.imageSrc.push({ img: value, active: true });
    this.eventImg.emit(value);
  }

  ngOnInit(): void {}
}
