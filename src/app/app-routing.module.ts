import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './components/basic/basic.component';
import { ValidationComponent } from './components/validation/validation.component';
import { FormExpressionComponent } from './components/form-expression/form-expression.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { JsonFormComponent } from './components/json-form/json-form.component';

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
  {
    path: 'json-form',
    component: JsonFormComponent
  },
  {
    path: 'module1',
    loadChildren: () => import('./modules/module1/module1.module').then(m => m.Module1Module)
  },
  {
    path: 'module2',
    loadChildren: () => import('./modules/module2/module2.module').then(m => m.Module2Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
