import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemingService } from './core/dynamic-theme/theming.service';
import { LayoutModule } from './core/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { appearance } from './core/dynamic-theme/default-mat-form-field';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
