import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { BasicComponent } from './components/basic/basic.component';
import { MenuComponent } from './core/menu/menu.component';
import { ValidationComponent } from './components/validation/validation.component';
import { FormExpressionComponent } from './components/form-expression/form-expression.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AdvanceWrapperComponent } from './components/advance-wrapper/advance-wrapper.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { Observable, of, switchMap, timer } from 'rxjs';

export function IpValidator(control: AbstractControl): ValidationErrors | null {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value)
    ? null
    : { ip: true };
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

// Custom validation message factories
export function minLengthValidationMessage(error: any, field: any): string {
  return `Must be at least ${field.templateOptions.minLength} characters long`;
}

export function maxLengthValidationMessage(error: any, field: any): string {
  return `Cannot exceed ${field.templateOptions.maxLength} characters`;
}

// Sync Validator: Prohibit restricted domains/characters
export function customPatternValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value) return null;
  const hasSpecial = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(control.value);
  return hasSpecial ? { specialCharacters: true } : null;
}

// Async Validator: Check availability against an API endpoint
export function uniqueUsernameValidator(
  control: AbstractControl,
): Observable<ValidationErrors | null> {
  if (!control.value) {
    return of(null);
  }

  // Simulate network latency (500ms debounce)
  return timer(500).pipe(
    switchMap(() => {
      const takenUsernames = ['admin', 'root', 'superuser', 'test'];
      const isTaken = takenUsernames.includes(
        control.value.toLowerCase().trim(),
      );
      return of(isTaken ? { usernameTaken: { value: control.value } } : null);
    }),
  );
}

// Validator message helpers
export function specialCharactersValidationMessage(
  error: any,
  field: any,
): string {
  return `"${field.formControl.value}" contains restricted special characters.`;
}

export function usernameTakenValidationMessage(error: any, field: any): string {
  return `The username "${error.value}" is already in use.`;
}

// Map of registered async validators
const ASYNC_VALIDATORS_REGISTRY: Record<string, any> = {
  uniqueUsername: uniqueUsernameValidator,
};

// Extension that resolves string names to validator functions
export function registerAsyncValidatorsExtension(field: FormlyFieldConfig) {
  if (!field.asyncValidators || !field.asyncValidators.validation) {
    return;
  }

  const raw = field.asyncValidators.validation;
  const list = Array.isArray(raw) ? raw : [raw];

  field.asyncValidators.validation = list.map((val) => {
    if (typeof val === 'string' && ASYNC_VALIDATORS_REGISTRY[val]) {
      return ASYNC_VALIDATORS_REGISTRY[val];
    }
    return val;
  });
}
@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    MenuComponent,
    ValidationComponent,
    FormExpressionComponent,
    FormLayoutComponent,
    JsonFormComponent,
    AdvanceWrapperComponent,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'advanced-field', component: AdvanceWrapperComponent },
      ],
      validators: [
        { name: 'ip', validation: IpValidator },
        { name: 'fieldMatch', validation: fieldMatchValidator },
        { name: 'noSpecialChars', validation: customPatternValidator },
      ],
      extensions: [
        {
          name: 'async-validators-resolver',
          extension: {
            prePopulate: registerAsyncValidatorsExtension,
          },
        },
      ],
      validationMessages: [
        { name: 'ip', message: IpValidatorMessage },
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minLengthValidationMessage },
        { name: 'maxlength', message: maxLengthValidationMessage },
        {
          name: 'specialCharacters',
          message: specialCharactersValidationMessage,
        },
        { name: 'usernameTaken', message: usernameTakenValidationMessage },
      ],
      types: [
        {
          name: 'ip',
          extends: 'input',
          defaultOptions: {
            validators: {
              ip: IpValidator1, // 'ip' matches the ip validation message
            },
          },
        },
        {
          name: 'advanced-input',
          component: CustomInputComponent,
        },
      ],
    }),
    HttpClientModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
