{
  "key": "itemId",
  "type": "select",
  "templateOptions": {
    "label": "Item(s) being used",
    "options": [],
    "valueProp": "id",
    "labelProp": "name"
  },
  "expressionProperties": {
    "templateOptions.disabled": "!model.companyId",
    "model.itemId": "!model.companyId ? null : model.itemId"
  },
  "hooks": {
    "onInit": "function(field) { field.templateOptions.options = field.form.get('companyId').valueChanges.pipe(startWith(this.model.companyId), switchMap(companyId => this.itemService.getAllItems(companyId))); }"
  },
  "validation": {
    "messages": {
      "required": "Please select the item(s) needed for this Use Ticket."
    }
  }
}



/////////

{
  key: 'itemId',
  type: 'select',
  templateOptions: {
    label: 'Item(s) being used',
    options: [],
    valueProp: 'id',
    labelProp: 'name'
  },
  expressionProperties: {
    "templateOptions.disabled": model => !model.companyId,
    "model.itemId": "!model.companyId ? null : model.itemId"
  },
  hooks: {
    onInit: (field: FormlyFieldConfig) => {
      field.templateOptions.options = field.form
        .get('companyId')
        .valueChanges.pipe(
          startWith(this.model.companyId),
          switchMap(companyId => this.itemService.getAllItems(companyId))
        );
    }
  },
  validation: {
    messages: {
      required: 'Please select the item(s) needed for this Use Ticket.'
    }
  }
}