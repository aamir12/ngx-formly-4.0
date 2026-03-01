import { Inject, Injectable } from '@angular/core';
import { MultiStepFormService } from 'src/app/core/multi-step-form.service';
import { SrapConfigService } from './srap-config.service';
import { APP_DOMAIN } from 'src/app/core/token';

@Injectable()
export class SrapFormService extends MultiStepFormService {
  // appDomain: string = 'srap';


  constructor(
    @Inject(APP_DOMAIN) public appDomain: string,
    public formConfigService: SrapConfigService) { 
    super();
    this.formConfigService.getFormData();
  }
  setupForm(): void {
    console.log('Setting up form for ' + this.appDomain);
  }
}
