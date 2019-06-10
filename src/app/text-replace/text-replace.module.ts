import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextReplaceComponent } from './text-replace.component';
import { TextReplaceRoutingModule } from './text-replace-routing.module';

@NgModule({
  declarations: [TextReplaceComponent],
  imports: [
    CommonModule,
    TextReplaceRoutingModule,
  ]
})
export class TextReplaceModule {
}
