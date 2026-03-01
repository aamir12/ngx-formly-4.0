import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TsrapFormComponent } from './tsrap-form/tsrap-form.component';

const routes: Routes = [
  {
    path: '',
    component: TsrapFormComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module2RoutingModule { }
