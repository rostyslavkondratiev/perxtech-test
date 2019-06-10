import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextReplaceComponent } from './text-replace.component';

const routes: Routes = [
  {path: '', component: TextReplaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextReplaceRoutingModule {

}
