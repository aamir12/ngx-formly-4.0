import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrapFormComponent } from './srap-form.component';

describe('SrapFormComponent', () => {
  let component: SrapFormComponent;
  let fixture: ComponentFixture<SrapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrapFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
