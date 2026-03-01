import { Inject, Injectable } from '@angular/core';
import { MultiStepFormService } from 'src/app/core/multi-step-form.service';
import { APP_DOMAIN } from 'src/app/core/token';
import { TsrapConfigService } from './tsrap-config.service';

@Injectable()
export class TsrapFormService extends MultiStepFormService {

  constructor(
    @Inject(APP_DOMAIN) public appDomain: string,
    public formConfigService: TsrapConfigService
  ) { 
    super();
    this.formConfigService.getFormData();
  }

  setupForm(): void {
    console.log('Setting up form for ' + this.appDomain);
  }
}
