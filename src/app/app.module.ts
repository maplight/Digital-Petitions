import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemingService } from './core/dynamic-theme/theming.service';
import { LayoutModule } from './core/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/legacy-form-field';
import { appearance } from './core/dynamic-theme/default-mat-form-field';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      // Provide the APP_INITIALIZER, wait until the theming configuration is fetched and set up correctly
      useFactory: (themingService: ThemingService) => () =>
        themingService.initializeTheme(),
      deps: [ThemingService],
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
