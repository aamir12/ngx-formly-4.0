import { Inject, Injectable } from '@angular/core';
import { MultiStepFormConfigService } from 'src/app/core/multi-step-form.config.service';
import { APP_DOMAIN } from 'src/app/core/token';

@Injectable()
export class SrapConfigService extends MultiStepFormConfigService {
  // appDomain: string = 'srap';
  setupConfig(): void {
    console.log('Setting up config for ' + this.appDomain);
  }
  constructor(
    @Inject(APP_DOMAIN) public appDomain: string,
  ) { 
    super();
  }
}
