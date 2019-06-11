import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextReplaceComponent } from './text-replace.component';
import { TextReplaceRoutingModule } from './text-replace-routing.module';
import { HeaderModule } from '../ui/header/header.module';
import { RandomTextReplaceDirective } from './random-text-replace.directive';

@NgModule({
  declarations: [TextReplaceComponent, RandomTextReplaceDirective],
  imports: [
    CommonModule,
    TextReplaceRoutingModule,
    HeaderModule,
  ]
})
export class TextReplaceModule {
}
