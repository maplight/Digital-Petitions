import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Amplify } from 'aws-amplify';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Amplify.configure(environment.awsExports);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
