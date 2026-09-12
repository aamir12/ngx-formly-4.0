import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IpValidator } from 'src/app/app.module';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent {
  form = new FormGroup({});
  model = {
    ip: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'ip',
      type: 'input',
      templateOptions: {
        label: 'IP Address (using custom validation declared in ngModule)',
        required: true,
        placeholder: '127.0.0.1',
      },
      validators: {
        validation: ['ip'],
      },
    },
  ];

  /*********/

  form1 = new FormGroup({});
  model1 = {
    ip: '',
    ip1: '',
  };

  fields1: FormlyFieldConfig[] = [
    {
      key: 'ip',
      type: 'input',
      templateOptions: {
        label: 'IP Address (using custom validation declared in ngModule)',
        required: true,
        placeholder: '127.0.0.1',
      },
      validators: {
        validation: [IpValidator],
      },
      // asyncValidators: {
      //   validation: [IpAsyncValidator],
      // },
    },
    {
      key: 'ip1',
      type: 'input',
      templateOptions: {
        label:
          'IP Address (using custom validation through `validators.expression` property)',
        description: 'custom validation message through `validators` property',
        required: true,
      },
      modelOptions: {
        updateOn: 'blur',
      },
      validators: {
        ip: {
          expression: (c: AbstractControl) => {
            // const parentForm = c.parent as FormGroup;
            return !c.value || /(\d{1,3}\.){3}\d{1,3}/.test(c.value);
          },
          message: (error: unknown, field: FormlyFieldConfig) =>
            `"${field.formControl?.value}" is not a valid IP Address`,
        },
      },
    },
  ];

  /*********/
  form2 = new FormGroup({});
  model2 = {
    ip: '',
  };

  fields2: FormlyFieldConfig[] = [
    {
      key: 'ip',
      type: 'ip',
      templateOptions: {
        label: 'IP Address (using custom validation declared in ngModule)',
        required: true,
        placeholder: '127.0.0.1',
      },
    },
  ];

  onModelChange(model: any) {
    // console.log('onModelChange', model);
  }

  onSubmit() {
    // console.log(this.model);
  }

  /********/

  form3 = new FormGroup({});
  model3: any = {};
  options3: FormlyFormOptions = {};

  fields3: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Must be at least 3 characters',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        },
      ],
    },
  ];

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
