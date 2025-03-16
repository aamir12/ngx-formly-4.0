## Appendix

Usage

formly-form
=>formly-field  className: 'customInput',
  =>formly-wrapper-form-field
    => Wrapper HTML
    => formly-field-input


{
      key: 'input', //textarea,checkbox,select,radio,multichecbox,datepicker
      type: 'input',
      fieldGroupClassName:'customGroupClassName', //formly-group component
      className: 'customInput', //formly-field 
      templateOptions: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true,
        options: [{label:'',value:''}] // used with multiple options. multichecbox,select,radio
      },
      focus:true,
      hideExpression: '!model.checkbox',
      hideExpression: function (formState: FormData) {
         return !!formState.checkbox;
      },
      validation: {},
      validators: {},
      asyncValidators:{},
      formControl,
      modelOptions,
},

