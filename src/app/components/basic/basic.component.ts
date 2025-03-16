import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

interface FormData {
  input: string;
  textarea: string;
  checkbox:boolean;
  select: string;
  radio: string;
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
    input: 'aamir'
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'input',
      type: 'input',
      fieldGroupClassName:'customGroupClassName', //formly-group component
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
      // hideExpression: '!model.checkbox',
      // hideExpression: function (formState: FormData) {
      //   return !!formState.checkbox;
      // },
      expressionProperties: {
        // 'templateOptions.disabled': 'model.checkbox',
        // 'templateOptions.required': 'model.checkbox',
        // 'templateOptions.options': (formState) => {
        //   return formState.checkbox ?  [{label: "XYZ", value: "1"}, {label: "ABC", value: "2"}] : []
        // },
        // 'templateOptions.options': 'model.checkbox ? [] : [{label: "XYZ", value: "1"}, {label: "ABC", value: "2"}]',
        // 'templateOptions.placeholder': 'model.checkbox ? "Disabled placeholder" : "Select placeholder"',
        // 'templateOptions.label': 'model.checkbox ? "Disabled label" : "Select"',
        // 'model.select': (model: FormData) => {
        //      return model.checkbox ? null : model.select;
        // },
        'model.select': 'model.checkbox ? null : model.select',
        
        
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
      key: 'radio',
      type: 'radio',
      templateOptions: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
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
  ];

  onModelChange(event: FormData) {
    console.log(event);
  }

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }
}
