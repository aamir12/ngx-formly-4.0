import { Injectable } from '@angular/core';

@Injectable()
export abstract class MultiStepFormConfigService {
  constructor() { }
  abstract appDomain: string;
  getFormData(): void {
    this.setupConfig();
    console.log('getFormData'  + this.appDomain);
  }
  abstract setupConfig(): void; 
  
}
