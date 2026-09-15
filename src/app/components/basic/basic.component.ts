import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyValueChangeEvent } from '@ngx-formly/core/lib/components/formly.field.config';
import { debounceTime, filter, Subject, take } from 'rxjs';
import {
  uniqueInSimpleArrayValidator,
  uniqueServerEmailValidator,
  UserService,
} from 'src/app/user.service';
/* 
<form>
  <formly-form>
    <formly-field> 
      <formly-wrapper-form-field>
      </formly-wrapper-form-field>
    </formly-field>

    <formly-field> 
      <formly-group>
        <formly-field> 
          <formly-wrapper-form-field>
          </formly-wrapper-form-field>
        <formly-field> 
      </formly-group>
    </formly-field>
  </formly-form>
<form>
*/
interface FormData {
  input: string;
  textarea: string;
  checkbox: boolean;
  select: string;
  radio: string;
  key_a: string;
  key_b: string;
  key_c: string;
  multichecbox: string[];
  investments: string[];
}

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  form = new FormGroup({});
  userService = inject(UserService);
  model: Partial<FormData> = {
    input: 'aamir',
    key_a: '',
    key_b: '',
    key_c: '',
    investments: ['admin@test.com', 'amir.khan@db.com'],
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      wrappers: ['advanced-field'],
      templateOptions: {
        label: 'Username',
        placeholder: 'e.g. jdoe_dev',
        required: true,
        minLength: 4,
        maxLength: 15,
        prefixIcon: 'bi bi-person',
        allowClear: true,
        tooltip: 'Pick a unique username for your handle.',
        description: 'Between 4 and 15 characters.',
        onAddonClick: (field: FormlyFieldConfig) => {
          console.log(field.parent);
          console.log(this.model);
        },
        suffixIcon: 'bi bi-info-circle',
      },
    },
    {
      key: 'username1',
      type: 'advanced-input',
      templateOptions: {
        label: 'Username1',
        placeholder: 'Enter unique username',
        required: true,
        clearable: true,
        prefixIcon: 'bi bi-person',
        showCharCount: true,
        maxLength: 20,
        tooltipText: 'Must be unique. Try "admin" to trigger async validation.',
        popoverTitle: 'Username Rules',
        popoverContent: 'No special characters allowed. Minimum 3 characters.',
        description: 'Used for system authentication.',
      },
      asyncValidators: {
        validation: ['uniqueUsername'],
      },
      validators: {
        validation: ['noSpecialChars'],
      },
      modelOptions: {
        updateOn: 'blur',
      },
    },
    {
      key: 'date1',
      type: 'advanced-date-input',
      templateOptions: {
        label: 'Date',
        placeholder: 'Enter Date',
        required: true,
      },
    },
    {
      key: 'input',
      type: 'input',
      className: 'customInput', //formly-field
      templateOptions: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true,
      },
    },
    {
      key: 'numberInput',
      type: 'input',
      templateOptions: {
        label: 'Input Number Only',
        placeholder: 'Input placeholder',
        required: true,
        pattern: '^[0-9]*$',
      },
      validation: {
        messages: { pattern: 'Invalid Number' },
      },
      expressionProperties: {
        'templateOptions.pattern': (model: FormData) =>
          model.checkbox ? '^[0-9]*$' : null,
      },
    },
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: {
        label: 'Textarea',
        placeholder: 'Textarea placeholder',
        required: true,
        rows: 5,
      },
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Checkbox',
        required: true,
      },
    },
    {
      key: 'select',
      type: 'select',
      focus: true,
      // Hide input by expression or callback fn
      // hideExpression: '!model.checkbox',
      // hideExpression: function (model: FormData) {
      //   return !!model.checkbox;
      // },
      expressionProperties: {
        // 'templateOptions.disabled': 'model.checkbox',
        'templateOptions.disabled': (model: FormData) => !model.checkbox,
        'templateOptions.required': 'model.checkbox',
        // 'templateOptions.options': (formState) => {
        //   return formState.checkbox ?  [{label: "XYZ", value: "1"}, {label: "ABC", value: "2"}] : []
        // },
        // 'templateOptions.options': 'model.checkbox ? [] : [{label: "XYZ", value: "1"}, {label: "ABC", value: "2"}]',
        // 'templateOptions.placeholder': 'model.checkbox ? "Disabled placeholder" : "Select placeholder"',
        // 'templateOptions.label': 'model.checkbox ? "Disabled label" : "Select"',

        //Reset value
        // 'model.select': (model: FormData) => {
        //      return model.checkbox ? null : model.select;
        // },
        'model.select': '!model.checkbox ? null : model.select',
      },
      templateOptions: {
        label: 'Select',
        placeholder: 'Select placeholder',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
      },
    },
    {
      key: 'documentsApplied',
      type: 'multicheckbox',
      templateOptions: {
        label: 'Select Applied Documents',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
      },
    },
    {
      key: 'radio',
      type: 'radio',
      templateOptions: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: true },
          { label: 'Option 2', value: false },
        ],
      },
    },
    {
      fieldGroupClassName: 'row', //<formly-group>
      hideExpression: '!model.radio',
      fieldGroup: [
        {
          key: 'key_a',
          className: 'col-md-12',
          type: 'input',
          templateOptions: {
            label: 'Key A',
          },
        },
        {
          key: 'key_b',
          className: 'col-md-6',
          type: 'input',
          templateOptions: {
            label: 'Key B',
          },
        },
        {
          key: 'key_c',
          className: 'col-md-6',
          type: 'input',
          templateOptions: {
            label: 'Key C',
          },
        },
      ],
    },
    {
      key: 'investments',
      type: 'array',
      fieldArray: {
        type: 'input',
        key: 'investmentName',
        templateOptions: {
          label: 'Name of Investment:',
          required: true,
        },
        modelOptions: {
          updateOn: 'blur',
        },
        validators: {
          validation: [uniqueInSimpleArrayValidator],
        },
        asyncValidators: {
          validation: [uniqueServerEmailValidator(this.userService)],
        },
        hooks: {
          onInit: (field) => {
            // Sibling sync: when this value changes/clears, revalidate other controls
            field?.formControl?.valueChanges.subscribe(() => {
              const parent = field.formControl?.parent as FormArray;
              if (parent && parent.controls) {
                parent.controls.forEach((siblingCtrl) => {
                  if (siblingCtrl !== field.formControl) {
                    siblingCtrl.updateValueAndValidity({
                      onlySelf: true,
                      emitEvent: false,
                    });
                  }
                });
              }
            });
          },
        },
      },
      templateOptions: {
        max: 3,
      },
    },
  ];

  //below is optional
  fieldChange = new Subject<FormlyValueChangeEvent>();
  options: FormlyFormOptions = {
    fieldChanges: this.fieldChange,
  };

  onModelChange(event: FormData) {
    console.log(event);
  }

  changeName(): void {
    // only change model value will not update the form control value, so we need to set the value of the form control as well
    this.model.input = 'khan';
    (this.form.get('input') as AbstractControl)?.setValue('khan');
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }

  // optional for basic
  ngOnInit() {
    this.fieldChange!.pipe(
      filter(
        (event) =>
          event.field.key === 'key_a' && this.form.get('key_a') != null,
      ),
      debounceTime(300),
      take(1),
    ).subscribe(() => {
      console.log('fieldChange');
      this.form.get('key_a')?.valueChanges.subscribe((value) => {
        this.fakeBackend(value);
      });
    });
  }

  fakeBackend(val: string) {
    // simulate loading values from backend
    setTimeout(() => {
      this.model.key_b = val + ' even';
      this.model.key_c = val + ' odd';

      // update Angular form and Formly
      (this.form.get('key_b') as AbstractControl)?.setValue(this.model.key_b);
      (this.form.get('key_c') as AbstractControl)?.setValue(this.model.key_c);
      this.form.updateValueAndValidity();
    }, 500);
  }
}
