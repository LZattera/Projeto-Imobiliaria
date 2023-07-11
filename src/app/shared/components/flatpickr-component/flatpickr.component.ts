import { FormsModule, ReactiveFormsModule, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import flatpickr from "flatpickr";
@Component({
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FlatpickrComponent),
    }
  ],
  selector: 'app-flatpickr-component',
  templateUrl: './flatpickr.component.html',
  styleUrls: ['./flatpickr.component.scss']
})
export class FlatpickrComponent implements OnInit {
  @Input(`id`)id                           : string = "flatpickr";
  @Input(`FormGroup`)FormGroup             : FormGroup = null;
  @Input(`formControlName`)formControlName : string = null;
  @Input(`placeholder`)placeholder         : string = "DD/MM/YYYY"
  @Input(`submitted`)submitted             : boolean = false;
  @Input(`enableTime`)enableTime           : boolean = false;
  @Input(`noCalendar`)noCalendar           : boolean = false;
  
  constructor() {}
  
  /** Date Format do calendario: @link: https://flatpickr.js.org/formatting/ */
  @Input(`dateFormat`)dateFormat: string = 'd/m/Y';
  dateModel: string = "";

  ngOnInit(): void {
    this.dateModel = this.FormGroup.value[this.formControlName];
    this.InitFlatpickr();

    console.log(this.dateModel, this.id)
  }
  
  InitFlatpickr(){
    console.log(`Evoking in - #${this.id}`)
    flatpickr(`#` + this.id, {
      dateFormat: this.dateFormat,
      locale: Portuguese,
      wrap: true,
      enableTime: this.enableTime,
      noCalendar: this.noCalendar,
    });
  }

  onChange: any = () => {}
  onTouch: any = () => {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
  }

  HasError: boolean = false;
  // ModelChanged(date){
  //   this.HasError = false;
  //   try{
  //     this.FormGroup.controls[this.formControlName].setValue(date);
  //   }catch{
  //     this.HasError = true;
  //     var msgError = "Error in setting form field \n"
  //     if(this.FormGroup == null){
  //       msgError += "(Form is null)";
  //     }else if(this.formControlName == null){
  //       msgError += "(form control name is null)";
  //     }
  //     console.error(msgError);
  //   }
  // }
}

