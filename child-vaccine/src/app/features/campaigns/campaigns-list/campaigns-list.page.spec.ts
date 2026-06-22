import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsListPage } from './campaigns-list.page';

describe('CampaignsListPage', () => {
  let component: CampaignsListPage;
  let fixture: ComponentFixture<CampaignsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
