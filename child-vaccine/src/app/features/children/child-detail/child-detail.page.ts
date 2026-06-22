import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonIcon,
  IonBadge, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircle, timeOutline, alertCircle, addOutline
} from 'ionicons/icons';
import { Observable } from 'rxjs';
import { ChildrenService } from '../../../core/services/children.service';
import { VaccineRecordsService } from '../../../core/services/vaccine-records.service';
import { Child } from '../../../core/models/child.model';
import { VaccineRecord, VaccineRecordStatus } from '../../../core/models/vaccine-record.model';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.page.html',
  styleUrls: ['./child-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonIcon,
    IonBadge, IonFab, IonFabButton
  ]
})
export class ChildDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private childrenService = inject(ChildrenService);
  private recordsService = inject(VaccineRecordsService);

  childId = '';
  child$!: Observable<Child | undefined>;
  records$!: Observable<VaccineRecord[]>;
  selectedSegment: 'all' | 'pending' = 'all';

  constructor() {
    addIcons({ checkmarkCircle, timeOutline, alertCircle, addOutline });
  }

  ngOnInit(): void {
    this.childId = this.route.snapshot.paramMap.get('id') ?? '';

    this.child$ = this.findChild();

    this.records$ = this.recordsService.getRecordsByChild(this.childId);
  }

  private findChild(): Observable<Child | undefined> {
    return this.childrenService.getChildById(this.childId);
  }

  filteredRecords(records: VaccineRecord[]): VaccineRecord[] {
    if (this.selectedSegment === 'pending') {
      return records.filter(r => r.getStatus() !== 'aplied');
    }
    return records;
  }

  getStatusIcon(status: VaccineRecordStatus): string {
    switch (status) {
      case 'aplied': return 'checkmark-circle';
      case 'late': return 'alert-circle';
      default: return 'time-outline';
    }
  }

  getStatusColor(status: VaccineRecordStatus): string {
    switch (status) {
      case 'aplied': return 'success';
      case 'late': return 'danger';
      default: return 'warning';
    }
  }

  getStatusLabel(status: VaccineRecordStatus): string {
    switch (status) {
      case 'aplied': return 'Aplicada';
      case 'late': return 'Atrasada';
      default: return 'Pendente';
    }
  }

  goToAddRecord(): void {
    this.router.navigateByUrl(`/tabs/children/${this.childId}/add-record`);
  }
}