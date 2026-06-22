import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonBadge, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Child } from '../../../core/models/child.model';

@Component({
  selector: 'app-child-card',
  templateUrl: './child-card.component.html',
  styleUrls: ['./child-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonBadge, IonIcon, IonProgressBar]
})
export class ChildCardComponent {
  @Input({ required: true }) child!: Child;
  @Input() overdueCount = 0;
  @Input() totalRecords = 0;
  @Input() appliedCount = 0;
  @Output() cardClick = new EventEmitter<void>();

  constructor() {
    addIcons({ alertCircleOutline, checkmarkCircleOutline });
  }

  onClick(): void {
    this.cardClick.emit();
  }

  get initials(): string {
    return this.child.name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  get progress(): number {
    if (this.totalRecords === 0) return 0;
    return this.appliedCount / this.totalRecords;
  }

  get progressLabel(): string {
    if (this.totalRecords === 0) return 'Nenhuma vacina registrada';
    return `${this.appliedCount} de ${this.totalRecords} doses aplicadas`;
  }
}