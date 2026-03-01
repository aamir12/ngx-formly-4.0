import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { UserService } from './user.service';
import { IpValidator } from 'src/app/app.module';
import { startWith, switchMap } from 'rxjs/operators';
import { FormlyHookFn, FormlyLifeCycleOptions } from '@ngx-formly/core/lib/components/formly.field.config';


@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss']
})
export class JsonFormComponent {
  form!: FormGroup;
  options: FormlyFormOptions = {};
  model: any;
  fields!: FormlyFieldConfig[];
  isFormConfigLoaded = false;
  constructor(private userService: UserService) {
    this.userService.getUserData().subscribe(([model, fields]) => {
      this.form = new FormGroup({});
      this.model = model;
      this.fields = this.mapFields(fields);
      this.isFormConfigLoaded = true;
    });
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }

  /**
   * Adjust the JSON fields loaded from the server.
   */
  mapFields(fields: FormlyFieldConfig[]) {
    return fields.map(f => {
      // Bind an observable to `color` field.
      if (f.key === 'color') {
        (f.templateOptions as FormlyTemplateOptions).options = this.userService.getColors();
      }

      if (f.key === 'companyId') {
        (f.templateOptions as FormlyTemplateOptions).options = this.userService.getCompanies();
      }

      if (f.key === 'ip') {
        f.validators = {
          validation: [IpValidator]
        }
      }

      if (f.key === 'itemId') {
        f.hooks = {
          onInit: (field: FormlyFieldConfig) => {
            if (!field || !field.form) return;

            const companyControl = field.form.get('companyId');
            if (!companyControl) return;
            (field.templateOptions as FormlyTemplateOptions).options = companyControl
              .valueChanges.pipe(
                startWith(this.model.companyId),
                switchMap((companyId: string | null) => {
                  // console.log(this.model);
                  this.model = {
                    ...this.model,
                    itemId: null
                  };
                  // (field.form as FormGroup).get('itemId')?.setValue(null);
                  return this.userService.getCompanyItems(companyId ?? '')})
              );
          } 
        } as FormlyLifeCycleOptions<FormlyHookFn>
        
      }
      return f;
    });
  }
}
