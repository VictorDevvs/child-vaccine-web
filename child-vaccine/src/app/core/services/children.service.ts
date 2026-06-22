import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Child } from '../models/child.model';

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private firestore = inject(Firestore);
  private collectionName = 'children';

  getChildrenByOwner(ownerId: string): Observable<Child[]> {
    const ref = collection(this.firestore, this.collectionName);
    const q = query(ref, where('ownerId', '==', ownerId));
    return collectionData(q, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(d => Child.fromFirestore(d.id, d)))
    );
  }

  getChildById(childId: string): Observable<Child | undefined> {
    const ref = doc(this.firestore, this.collectionName, childId);
    return docData(ref, { idField: 'id' }).pipe(
      map((data: any) => (data ? Child.fromFirestore(childId, data) : undefined))
    );
  }

  addChild(child: Child): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, child.toFirestore());
  }

  updateChild(child: Child): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, child.id);
    return updateDoc(ref, child.toFirestore());
  }

  deleteChild(childId: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, childId);
    return deleteDoc(ref);
  }
}