import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsrapFormComponent } from './tsrap-form.component';

describe('TsrapFormComponent', () => {
  let component: TsrapFormComponent;
  let fixture: ComponentFixture<TsrapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsrapFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsrapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
