import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline, peopleOutline } from 'ionicons/icons';
import { Observable, switchMap, map, of } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { AuthService } from '../../../core/services/auth.service';
import { ChildrenService } from '../../../core/services/children.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonList, IonItem, IonLabel
  ]
})
export class ProfilePage implements OnInit {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  private childrenService = inject(ChildrenService);
  private router = inject(Router);

  userEmail$!: Observable<string | null>;
  childrenCount$!: Observable<number>;

  constructor() {
    addIcons({ personCircleOutline, logOutOutline, peopleOutline });
  }

  ngOnInit(): void {
    this.userEmail$ = authState(this.auth).pipe(
      map(user => user?.email ?? null)
    );

    this.childrenCount$ = authState(this.auth).pipe(
      switchMap(user => user ? this.childrenService.getChildrenByOwner(user.uid) : of([])),
      map(children => children.length)
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }
}