import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SrapFormComponent } from './srap-form/srap-form.component';

const routes: Routes = [
  {
    path: '',
    component: SrapFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module1RoutingModule { }
