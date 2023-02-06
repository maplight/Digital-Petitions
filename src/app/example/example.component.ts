import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { SignElement } from './sign-element.interface';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

const ELEMENT_DATA: SignElement[] = [
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
  {
    signer_name: 'Savannah Nguyen',
    signer_date: 'Signe 11/25/2018 2:34 PM EDT',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063 ',
    email: 'jackson.graham@example.com',
    registered: 'Registered',
  },
];

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  tableBorderless: boolean = false;

  constructor(public dialog: MatDialog) {}

  title = 'digital-petitions';
  displayedColumns: string[] = [
    'check',
    'signer_name',
    'signer_date',
    'address',
    'email',
    'registered',
  ];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<SignElement>();

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '690px',
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}
