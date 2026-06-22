import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Vaccine } from '../models/vaccine.model';

@Injectable({ providedIn: 'root' })
export class VaccinesService {
  private firestore = inject(Firestore);
  private collectionName = 'vaccines';

  getAllVaccines(): Observable<Vaccine[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(d => Vaccine.fromFirestore(d.id, d)))
    );
  }
}