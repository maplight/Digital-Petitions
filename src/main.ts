import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Amplify } from 'aws-amplify';
import { AppModule } from './app/app.module';
import awsmobile from './environments/aws-exports';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
Amplify.configure(awsmobile);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
