import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { UserService } from './user.service';
import { IpValidator } from 'src/app/app.module';
import { startWith, switchMap, tap } from 'rxjs/operators';
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
      // Bind options from API
      if (f.key === 'color') {
        (f.templateOptions as FormlyTemplateOptions).options = this.userService.getColors();
      }

      if (f.key === 'companyId') {
        (f.templateOptions as FormlyTemplateOptions).options = this.userService.getCompanies();
      }

      //Add client side logical function
      if (f.key === 'ip') {
        f.validators = {
          validation: [IpValidator]
        }
      }

      //Dependent value
      if (f.key === 'itemId') {
        f.hooks = {
          onInit: (field: FormlyFieldConfig) => {
            if (!field || !field.form) return;

            const companyControl = field.form.get('companyId');
            if (!companyControl) return;

            (field.templateOptions as FormlyTemplateOptions).options = companyControl
              .valueChanges.pipe(
                startWith(companyControl.value),
                switchMap(
                  (companyId: string | null) => this.userService.getCompanyItems(companyId ?? '')),
                tap(options => {
                  const itemIdControl = (field.formControl as FormControl);
                  if (!options.find(option => option.id === itemIdControl.value)) {
                    itemIdControl.setValue(null);
                  }
                })
              );
          } 
        } as FormlyLifeCycleOptions<FormlyHookFn>
        
      }
      return f;
    });
  }
}
