import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { BasicComponent } from './components/basic/basic.component';
import { MenuComponent } from './core/menu/menu.component';
import { ValidationComponent } from './components/validation/validation.component';
import { FormExpressionComponent } from './components/form-expression/form-expression.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';


export function IpValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { 'ip': true };
}

export function IpValidator1(control: FormControl): boolean {
  return /(\d{1,3}\.){3}\d{1,3}/.test(control.value);
}

export function IpValidatorMessage(err: any, field: FormlyFieldConfig): string {
  return `"${field.formControl?.value}" is not a valid IP Address`;
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    MenuComponent,
    ValidationComponent,
    FormExpressionComponent,
    FormLayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'ip', validation: IpValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
      ],
      validationMessages: [
        { name: 'ip', message: IpValidatorMessage },
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        {
          name: 'ip',
          extends: 'input',
          defaultOptions: {
            validators: {
              ip: IpValidator1 // 'ip' matches the ip validation message
            }
          },
        }
      ]
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
