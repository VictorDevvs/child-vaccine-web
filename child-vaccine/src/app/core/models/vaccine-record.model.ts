export type VaccineRecordStatus = 'aplied' | 'pending' | 'late';

export class VaccineRecord {
    constructor(
        public id: string,
        public childId: string,
        public VaccineId: string,
        public VaccineName: string,
        public doseNumber: number,
        public shceduleDate: Date,
        public apliedDate: Date | null = null,
        public notes: string = '',
    ){}

    getStatus(): VaccineRecordStatus {
        if (this.apliedDate) {
            return 'aplied';
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.shceduleDate < today ? 'late' : 'pending';
    }

    isOverdue(): boolean {
        return this.getStatus() === 'late';
    }

    apply(date: Date = new Date()): void {
        this.apliedDate = date;
    }

    static fromFirestore(id: string, data: any): VaccineRecord {
        return new VaccineRecord(
            id,
            data.childId,
            data.VaccineId,
            data.VaccineName,
            data.doseNumber,
            data.shceduleDate?.toDate ? data.shceduleDate.toDate() : new Date(data.shceduleDate),
            data.apliedDate 
                ? (data.apliedDate.toDate ? data.apliedDate.toDate() : new Date(data.apliedDate)) : null,
            data.notes || ''
        );
    }

    toFirestore(): any {
        return {
            childId: this.childId,
            VaccineId: this.VaccineId,
            VaccineName: this.VaccineName,
            doseNumber: this.doseNumber,
            shceduleDate: this.shceduleDate,
            apliedDate: this.apliedDate,
            notes: this.notes
        };
    }
}
