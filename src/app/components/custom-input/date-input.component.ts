import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-formly-date-field-advanced-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group mb-3 position-relative">
      <input
        [formControl]="formControl"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
        [class.is-valid]="
          formControl.valid && (formControl.touched || formControl.dirty)
        "
        [placeholder]="to.placeholder || ''"
        [id]="id"
        class="form-control"
        bsDatepicker
      />

      <!-- Formly Validation Errors -->
      <div
        [id]="id + '-feedback'"
        class="invalid-feedback d-block"
        *ngIf="showError"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
    </div>
  `,
  styles: [
    `
      .cursor-pointer {
        cursor: pointer;
      }
    `,
  ],
})
export class DateInputComponent extends FieldType<FieldTypeConfig> {
  @ViewChild(BsDatepickerDirective, { static: false })
  datepicker?: BsDatepickerDirective;

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
}
