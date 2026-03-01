import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { UserService } from './user.service';
import { IpValidator } from 'src/app/app.module';

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

  constructor(private userService: UserService) {
    this.userService.getUserData().subscribe(([model, fields]) => {
      this.form = new FormGroup({});
      this.model = model;
      this.fields = this.mapFields(fields);
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

      if (f.key === 'ip') {
        f.validators = {
          validation: [IpValidator]
        }
      }

      return f;
    });
  }
}
