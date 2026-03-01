import { Injectable } from '@angular/core';

@Injectable()
export abstract class MultiStepFormService {
  abstract appDomain: string;
  constructor() { }
  
  submitForm(): void {
    this.setupForm();
    // Logic to submit the form
    console.log('Form submitted'  + this.appDomain);
  }
  abstract setupForm(): void; 
}
