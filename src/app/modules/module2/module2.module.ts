import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsrapFormComponent } from './tsrap-form/tsrap-form.component';
import { Module2RoutingModule } from './module2-routing.module';
import { APP_DOMAIN } from 'src/app/core/token';
import { SrapConfigService } from '../module1/srap-config.service';
import { SrapFormService } from '../module1/srap-form.service';



@NgModule({
  declarations: [
    TsrapFormComponent
  ],
  imports: [
    CommonModule,
    Module2RoutingModule
  ],
  providers: [
    SrapConfigService,
    SrapFormService,
    {
      provide: APP_DOMAIN,
      useValue: 'tsrap'
    }
  ]
})
export class Module2Module { }
