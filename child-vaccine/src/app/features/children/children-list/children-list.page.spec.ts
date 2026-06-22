import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildrenListPage } from './children-list.page';

describe('ChildrenListPage', () => {
  let component: ChildrenListPage;
  let fixture: ComponentFixture<ChildrenListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
