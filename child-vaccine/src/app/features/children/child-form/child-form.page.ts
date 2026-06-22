import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonText,
} from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { ChildrenService } from '../../../core/services/children.service';
import { Child, Gender } from '../../../core/models/child.model';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.page.html',
  styleUrls: ['./child-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonText
  ]
})
export class ChildFormPage {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private childrenService = inject(ChildrenService);
  private router = inject(Router);

  errorMessage = '';
  isLoading = false;
  maxDateTime = this.formatDateTimeForInput(new Date());

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', Validators.required],
    gender: ['male' as Gender, Validators.required]
  });

  private formatDateTimeForInput(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      this.errorMessage = 'Sessão expirada. Faça login novamente.';
      return;
    }

    this.isLoading = true;
    const { name, birthDate, gender } = this.form.value;
    const parsedBirthDate = new Date(birthDate!);

    const newChild = new Child(
      '',
      name!,
      parsedBirthDate,
      gender as Gender,
      user.uid
    );

    this.childrenService.addChild(newChild)
      .then(() => {
        this.router.navigateByUrl('/tabs/children', { replaceUrl: true });
      })
      .catch(() => {
        this.isLoading = false;
        this.errorMessage = 'Não foi possível salvar. Tente novamente.';
      });
  }
}