import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonToggle,
  IonDatetime, IonDatetimeButton, IonModal, IonLabel
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { VaccinesService } from '../../../core/services/vaccines.service';
import { VaccineRecordsService } from '../../../core/services/vaccine-records.service';
import { VaccineRecord } from '../../../core/models/vaccine-record.model';
import { Vaccine } from '../../../core/models/vaccine.model';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonToggle,
    IonDatetime, IonDatetimeButton, IonModal, IonLabel
  ]
})
export class AddRecordPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vaccinesService = inject(VaccinesService);
  private recordsService = inject(VaccineRecordsService);

  childId = '';
  vaccines$!: Observable<Vaccine[]>;
  errorMessage = '';
  isLoading = false;

  form = this.fb.group({
    vaccineId: ['', Validators.required],
    doseNumber: [1, Validators.required],
    scheduledDate: [new Date().toISOString(), Validators.required],
    alreadyApplied: [false],
    appliedDate: [new Date().toISOString()]
  });

  ngOnInit(): void {
    this.childId = this.route.snapshot.paramMap.get('id') ?? '';
    this.vaccines$ = this.vaccinesService.getAllVaccines();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const v = this.form.value;

    this.vaccinesService.getAllVaccines().subscribe(vaccines => {
      const vaccine = vaccines.find(vac => vac.id === v.vaccineId);
      if (!vaccine) {
        this.errorMessage = 'Vacina não encontrada.';
        this.isLoading = false;
        return;
      }

      const record = new VaccineRecord(
        '',
        this.childId,
        vaccine.id,
        vaccine.name,
        v.doseNumber!,
        new Date(v.scheduledDate!),
        v.alreadyApplied ? new Date(v.appliedDate!) : null
      );

      this.recordsService.addRecord(record)
        .then(() => {
          this.router.navigateByUrl(`/tabs/children/${this.childId}`, { replaceUrl: true });
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMessage = 'Não foi possível salvar. Tente novamente.';
        });
    });
  }
}