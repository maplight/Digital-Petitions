import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {
    this.matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/heroicons-solid.svg'
      )
    );
  }

  ngOnInit(): void {}
}
