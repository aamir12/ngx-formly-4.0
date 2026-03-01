import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyValueChangeEvent } from '@ngx-formly/core/lib/components/formly.field.config';
import { debounceTime, filter, Subject, take } from 'rxjs';
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
  checkbox:boolean;
  select: string;
  radio: string;
  key_a: string;
  key_b: string;
  key_c: string;
  multichecbox: string[];
}

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  form = new FormGroup({});
  model: Partial<FormData> = {
    input: 'aamir',
    key_a: '',
    key_b: '',
    key_c: '',
  };
  fields: FormlyFieldConfig[] = [
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
      focus:true,
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
      fieldGroupClassName:"row", //<formly-group>
      hideExpression: "!model.radio",
      fieldGroup: [
        {
          key: 'key_a',
          className: 'col-md-12',
          type: 'input',
          templateOptions: {
            label: 'Key A',
          }
        },
        {
          key: 'key_b',
          className: 'col-md-6',
          type: 'input',
          templateOptions: {
            label: 'Key B',
          }
        },
        {
          key: 'key_c',
          className: 'col-md-6',
          type: 'input',
          templateOptions: {
            label: 'Key C',
          }
        }
      ] 
    }
  ];

  //below is optional
  fieldChange = new Subject<FormlyValueChangeEvent>();
  options: FormlyFormOptions = {
    fieldChanges: this.fieldChange,
  }

  onModelChange(event: FormData) {
    console.log(event);
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }

  // optional for basic
  ngOnInit() {
    this.fieldChange!
      .pipe(
        filter(
          (event) =>
            event.field.key === 'key_a' && this.form.get('key_a') != null
        ),
        debounceTime(300),
        take(1)
      )
      .subscribe(() => {
        this.form
        .get('key_a')
        ?.valueChanges.subscribe((value) => {
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
