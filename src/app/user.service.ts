import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Replace with your actual HttpClient call
  checkEmailExists(email: string): Observable<boolean> {
    const existingEmails = ['admin@test.com', 'user@test.com'];
    return timer(400).pipe(
      map(() => existingEmails.includes(email.trim().toLowerCase())),
    );
  }
}

export function uniqueServerEmailValidator(
  userService: UserService,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }
    return userService
      .checkEmailExists(control.value)
      .pipe(map((isTaken) => (isTaken ? { serverEmailTaken: true } : null)));
  };
}

export function uniqueInSimpleArrayValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const parentArray = control.parent as FormArray;
  if (!parentArray || !(parentArray instanceof FormArray)) {
    return null;
  }

  const currentValue = String(control.value).trim().toLowerCase();

  // Extract all string values from the parent FormArray
  const values = parentArray.controls
    .map((c) => (c.value ? String(c.value).trim().toLowerCase() : ''))
    .filter((val) => Boolean(val));

  // Count occurrences of the current value
  const occurrences = values.filter((val) => val === currentValue).length;

  return occurrences > 1 ? { duplicateInArray: true } : null;
}
