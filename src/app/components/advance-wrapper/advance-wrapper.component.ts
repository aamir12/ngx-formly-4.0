import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-advance-wrapper',
  templateUrl: './advance-wrapper.component.html',
  styleUrls: ['./advance-wrapper.component.scss'],
})
export class AdvanceWrapperComponent extends FieldWrapper {
  get currentLength(): number {
    return (this.formControl?.value ?? '').toString().length;
  }

  onClear(): void {
    this.formControl?.setValue('');
    this.formControl?.markAsDirty();
  }

  onAddonClick(): void {
    if (typeof this.to['onAddonClick'] === 'function') {
      this.to['onAddonClick'](this.field);
    }
  }
}
