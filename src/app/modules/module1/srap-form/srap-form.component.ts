import { Component } from '@angular/core';
import { SrapFormService } from '../srap-form.service';
import { SrapConfigService } from '../srap-config.service';

@Component({
  selector: 'app-srap-form',
  templateUrl: './srap-form.component.html',
  styleUrls: ['./srap-form.component.scss']
})
export class SrapFormComponent {
  constructor(
    public srapFormService: SrapFormService,
    public srapConfigService: SrapConfigService
  ) { }
}
