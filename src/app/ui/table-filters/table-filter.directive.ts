import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appTableFilter]'
})
export class TableFilterDirective {

  @Input('appTableFilter') name: string;
  @Input('appTableFilterValue') value: any;

  constructor(public template: TemplateRef<{ $implicit: AbstractControl }>) {
  }

}
