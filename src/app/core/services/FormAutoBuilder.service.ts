import { FormBuilder, Validators, FormGroup } from '@angular/forms';

class FormAutoBuilderHelper{
    private fb: FormBuilder = new FormBuilder();

    constructor ( 
            public Object: object,
            public NonOptionalFields: string[] = []
    ){  
    }

    GetForm(): FormGroup{
        let properties = Object.getOwnPropertyNames(this.Object)

        var form = this.fb.group({
        });

        properties.forEach(prop => {
            this.AddControl(form, prop, this.NonOptionalFields.includes(prop));
        });
        return form;
    }

    AddControl(form: FormGroup, name: string, validator : boolean = false) {
        validator ? 
            form.addControl(name , this.fb.control(null, Validators.required)) : 
            form.addControl(name , this.fb.control(null));
    }
}


export class FormAutoBuilder{
    private Form: FormGroup;
  
    constructor(
      Object: object, 
      NonOptionalFields: string[] = []
    ){
      let formAutoBuilder = new FormAutoBuilderHelper(Object, NonOptionalFields);
      this.Form = formAutoBuilder.GetForm();
      NonOptionalFields = [];
    }
  
    public GetForm() : FormGroup {
      return this.Form;
    }
  }