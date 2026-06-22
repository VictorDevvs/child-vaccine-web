import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { VaccineRecord } from '../models/vaccine-record.model';

@Injectable({ providedIn: 'root' })
export class VaccineRecordsService {
  private firestore = inject(Firestore);
  private collectionName = 'vaccineRecords';

  getRecordsByChild(childId: string): Observable<VaccineRecord[]> {
    const ref = collection(this.firestore, this.collectionName);
    const q = query(
      ref,
      where('childId', '==', childId),
      orderBy('scheduledDate', 'asc')
    );
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(d => VaccineRecord.fromFirestore(d.id, d)))
    );
  }

  addRecord(record: VaccineRecord): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, record.toFirestore());
  }

  markAsApplied(record: VaccineRecord, date: Date = new Date()): Promise<void> {
    record.apply(date);
    const ref = doc(this.firestore, this.collectionName, record.id);
    return updateDoc(ref, { appliedDate: date });
  }
}