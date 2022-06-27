import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemingService } from './dynamic-teme/theming.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      // Provide the APP_INITIALIZER, wait until the theming configuration is fetched and set up correctly
      useFactory: (themingService: ThemingService) => () => themingService.initializeTheme(),
      deps: [ThemingService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
