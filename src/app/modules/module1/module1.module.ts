import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrapFormComponent } from './srap-form/srap-form.component';
import { Module1RoutingModule } from './module1-routing.module';
import { SrapConfigService } from './srap-config.service';
import { SrapFormService } from './srap-form.service';
import { APP_DOMAIN } from 'src/app/core/token';

@NgModule({
  declarations: [
    SrapFormComponent
  ],
  imports: [
    CommonModule,
    Module1RoutingModule
  ],
  providers: [
    SrapConfigService,
    SrapFormService,
    {
          provide: APP_DOMAIN,
          useValue: 'srap'
    }
  ]
})
export class Module1Module { }
