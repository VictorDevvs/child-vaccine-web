import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Campaign } from '../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignsService {
  private firestore = inject(Firestore);
  private collectionName = 'campaigns';

  getAllCampaigns(): Observable<Campaign[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(d => Campaign.fromFirestore(d.id, d)))
    );
  }
}