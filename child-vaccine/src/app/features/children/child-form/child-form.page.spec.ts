import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildFormPage } from './child-form.page';

describe('ChildFormPage', () => {
  let component: ChildFormPage;
  let fixture: ComponentFixture<ChildFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
