import { Inject, Injectable } from '@angular/core';
import { MultiStepFormConfigService } from 'src/app/core/multi-step-form.config.service';
import { APP_DOMAIN } from 'src/app/core/token';

@Injectable()
export class TsrapConfigService extends MultiStepFormConfigService {
  // appDomain: string = 'tsrap';
  constructor(
    @Inject(APP_DOMAIN) public appDomain: string,
  ) {
    super();
   }
  setupConfig(): void {
    console.log('Setting up config for ' + this.appDomain);
  }

}
