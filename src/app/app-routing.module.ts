import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './components/basic/basic.component';
import { ValidationComponent } from './components/validation/validation.component';
import { FormExpressionComponent } from './components/form-expression/form-expression.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic',
    pathMatch: 'full'
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'validation',
    component: ValidationComponent
  },
  {
    path: 'form-expression',
    component: FormExpressionComponent
  },
  {
    path: 'form-layout',
    component: FormLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
