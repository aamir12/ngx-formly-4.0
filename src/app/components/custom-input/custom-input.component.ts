import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-advanced-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-group mb-3 position-relative">
      <!-- Field Label -->
      <label
        [attr.for]="id"
        *ngIf="to.label"
        class="form-label d-flex align-items-center"
      >
        <span>{{ to.label }}</span>
        <span
          *ngIf="to.required && !to['hideRequiredMarker']"
          class="text-danger ms-1"
          >*</span
        >

        <!-- ngx-bootstrap Tooltip -->
        <i
          *ngIf="to['tooltipText']"
          class="bi bi-info-circle ms-2 text-muted cursor-pointer"
          [tooltip]="to['tooltipText']"
          [placement]="to['tooltipPlacement'] || 'top'"
          container="body"
        ></i>

        <!-- ngx-bootstrap Popover -->
        <i
          *ngIf="to['popoverContent']"
          class="bi bi-question-circle ms-2 text-secondary cursor-pointer ms-auto"
          [popover]="to['popoverContent'] || 'Default'"
          [popoverTitle]="to['popoverTitle'] || ''"
          [outsideClick]="true"
          container="body"
        ></i>
      </label>

      <!-- Input Group Container -->
      <div class="input-group" [class.has-validation]="showError">
        <!-- Prefix Addon / Icon -->
        <span
          class="input-group-text"
          *ngIf="to['prefixText'] || to['prefixIcon']"
        >
          <i
            *ngIf="to['prefixIcon']"
            [class]="to['prefixIcon']"
            class="me-1"
          ></i>
          {{ to['prefixText'] }}
        </span>

        <!-- Main Form Input -->
        <input
          [type]="to.type || 'text'"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [id]="id"
          class="form-control"
          [class.is-invalid]="showError"
          [class.is-valid]="
            formControl.valid && (formControl.touched || formControl.dirty)
          "
          [placeholder]="to.placeholder || ''"
          [attr.maxlength]="to.maxLength"
          [attr.aria-describedby]="id + '-feedback'"
        />

        <!-- Clear Button -->
        <button
          *ngIf="to['clearable'] && formControl.value && !to['disabled']"
          class="btn btn-outline-secondary"
          type="button"
          (click)="clearInput()"
          tabindex="-1"
          title="Clear"
        >
          &times;
        </button>

        <!-- Suffix Addon / Icon -->
        <span
          class="input-group-text"
          *ngIf="to['suffixText'] || to['suffixIcon']"
        >
          <i
            *ngIf="to['suffixIcon']"
            [class]="to['suffixIcon']"
            class="me-1"
          ></i>
          {{ to['suffixText'] }}
        </span>

        <!-- Async Validation Spinner -->
        <span *ngIf="formControl.pending" class="input-group-text bg-white">
          <span
            class="spinner-border spinner-border-sm text-primary"
            role="status"
          ></span>
        </span>
      </div>

      <!-- Character Counter & Description -->
      <div class="d-flex justify-content-between mt-1 small">
        <div class="text-muted" *ngIf="to['description']">
          {{ to['description'] }}
        </div>
        <div
          class="text-muted ms-auto"
          *ngIf="to['showCharCount'] && to['maxLength']"
          [class.text-danger]="
            (formControl.value?.length || 0) >= to['maxLength']
          "
        >
          {{ formControl.value?.length || 0 }} / {{ to['maxLength'] }}
        </div>
      </div>

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
export class CustomInputComponent extends FieldType<FieldTypeConfig> {
  clearInput(): void {
    this.formControl.setValue('');
    this.formControl.markAsDirty();
  }
}
