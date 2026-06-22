import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonFab, IonFabButton, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, logOutOutline } from 'ionicons/icons';
import { Observable, switchMap, map, of, combineLatest } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { ChildrenService } from '../../../core/services/children.service';
import { VaccineRecordsService } from '../../../core/services/vaccine-records.service';
import { AuthService } from '../../../core/services/auth.service';
import { Child } from '../../../core/models/child.model';
import { ChildCardComponent } from '../../../shared/components/child-card/child-card.component';

interface ChildWithStatus {
  child: Child;
  overdueCount: number;
  appliedCount: number;
  totalRecords: number;
}

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.page.html',
  styleUrls: ['./children-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonFab, IonFabButton, IonGrid, IonRow, IonCol,
    ChildCardComponent
  ]
})
export class ChildrenListPage implements OnInit {
  private auth = inject(Auth);
  private childrenService = inject(ChildrenService);
  private recordsService = inject(VaccineRecordsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  childrenWithStatus$!: Observable<ChildWithStatus[]>;

  constructor() {
    addIcons({ addOutline, logOutOutline });
  }

  ngOnInit(): void {
    this.childrenWithStatus$ = authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        return this.childrenService.getChildrenByOwner(user.uid);
      }),
      switchMap(children => {
        if (children.length === 0) {
          return of([]);
        }
        const withStatus$ = children.map(child =>
          this.recordsService.getRecordsByChild(child.id).pipe(
            map(records => ({
            child,
            overdueCount: records.filter(r => r.isOverdue()).length,
            appliedCount: records.filter(r => r.getStatus() === 'aplied').length,
            totalRecords: records.length
      }))
    )
  );
        return combineLatest(withStatus$);
      })
    );
  }

  goToDetail(childId: string): void {
    this.router.navigateByUrl(`/tabs/children/${childId}`);
  }

  goToAddChild(): void {
    this.router.navigateByUrl('/tabs/children/new');
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}