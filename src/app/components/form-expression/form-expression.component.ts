import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-expression',
  templateUrl: './form-expression.component.html',
  styleUrls: ['./form-expression.component.scss']
})
export class FormExpressionComponent {
  show = false;
  form: FormGroup;
  model: any = {};
  options = {
    formState: {
      mainModel: this.model,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      type: 'input',
      key: 'text',
      templateOptions: {
        placeholder: 'write something',
        label: 'field 1'
      }
    },
    {
      key: 'country',
      type: 'input',
      templateOptions: {
        label: 'field 2',
        placeholder: ''
      },
      hideExpression: '!!model?.text?.trim()?.length === false',
      expressionProperties: {
        'model.country': '!!model?.text?.trim()?.length === false  ? undefined : model.country',
      }
    }
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
    this.form1 = fb.group({});
  }
  toggle() {
    this.show = !this.show;
    this.fields[1].hideExpression = this.show;
  }

  /**********/

  form1: FormGroup;
  model1: any = {};
  options1 = {
    formState: {
      mainModel: this.model1,
    },
  };
  fields1: FormlyFieldConfig[] = [
    {
        type: 'input',
        key: 'city',
        templateOptions: {
          placeholder: 'set 123',
          label: 'Street 1'
        }
    },
     {
      key: 'country',
      type: 'input',
      templateOptions: {
        label: 'City',
        placeholder: 'set to 123'
      },
       hideExpression: (model: any, formState: any,  fieldConfig: FormlyFieldConfig | undefined) => {
        // access to the main model can be through `this.model` or `formState` or `model
        // console.log(_model, formState);
        // console.log(_field);
        if (formState.mainModel && formState.mainModel.city) {
          return formState.mainModel.city !== "123"
        }
        return true;
      },
    },
  ];
}
