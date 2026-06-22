import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
  IonBadge, IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphoneOutline, calendarOutline, locationOutline } from 'ionicons/icons';
import { Observable, combineLatest, map, switchMap, of } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { CampaignsService } from '../../../core/services/campaigns.service';
import { ChildrenService } from '../../../core/services/children.service';
import { Campaign } from '../../../core/models/campaign.model';
import { Child } from '../../../core/models/child.model';

interface CampaignWithEligibility {
  campaign: Campaign;
  eligibleChildren: Child[];
}

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.page.html',
  styleUrls: ['./campaigns-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
    IonBadge, IonIcon, IonGrid, IonRow, IonCol
  ]
})
export class CampaignsListPage implements OnInit {
  private auth = inject(Auth);
  private campaignsService = inject(CampaignsService);
  private childrenService = inject(ChildrenService);

  activeCampaigns$!: Observable<CampaignWithEligibility[]>;
  pastCampaigns$!: Observable<Campaign[]>;

  constructor() {
    addIcons({ megaphoneOutline, calendarOutline, locationOutline });
  }

  ngOnInit(): void {
    const children$: Observable<Child[]> = authState(this.auth).pipe(
      switchMap(user => user ? this.childrenService.getChildrenByOwner(user.uid) : of([]))
    );

    const combined$ = combineLatest([this.campaignsService.getAllCampaigns(), children$]);

    this.activeCampaigns$ = combined$.pipe(
      map(([campaigns, children]) =>
        campaigns
          .filter(c => c.isActive())
          .map(campaign => ({
            campaign,
            eligibleChildren: children.filter(child =>
              campaign.isChildEligible(child.getAgeInMonths())
            )
          }))
      )
    );

    this.pastCampaigns$ = this.campaignsService.getAllCampaigns().pipe(
      map(campaigns => campaigns.filter(c => !c.isActive()))
    );
  }
}