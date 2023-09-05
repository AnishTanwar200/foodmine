import { Component,Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any={
  required: 'Shouls not be empty',
  email: 'Email is not valid',
  minlength: 'Field is to short',
  notMatch: 'Password and Confirm Password does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  errorMessages:string[] = [];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() =>{
      this.checkValidation();
    })

    this.control.valueChanges.subscribe(() =>{
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKey = Object.keys(errors);
    this.errorMessages = errorKey.map(key => VALIDATORS_MESSAGES[key]);
  }

}
