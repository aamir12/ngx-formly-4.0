import { Component } from '@angular/core';
import { SrapFormService } from '../../module1/srap-form.service';
import { SrapConfigService } from '../../module1/srap-config.service';

@Component({
  selector: 'app-tsrap-form',
  templateUrl: './tsrap-form.component.html',
  styleUrls: ['./tsrap-form.component.scss']
})
export class TsrapFormComponent {
  constructor(
    public tsrapFormService: SrapFormService,
        public tsrapConfigService: SrapConfigService
  ) { }
}
