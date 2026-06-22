export class Campaign {
    constructor(
      public id: string,
      public title: string,
        public description: string,
        public VaccineName: string,
        public targetAgeMinMonths: number,
        public targetAgeMaxMonths: number,
        public startDate: Date,
        public endDate: Date,
        public location: string = ''  
    ){}

    isActive(): boolean {
        const now = new Date();
        return now >= this.startDate && now <= this.endDate;
    }

    isChildEligible(ageInMonths: number): boolean {
        return ageInMonths >= this.targetAgeMinMonths && ageInMonths <= this.targetAgeMaxMonths;
    }

    static fromFirestore(id: string, data: any): Campaign {
        return new Campaign(
            id,
            data.title,
            data.description,
            data.VaccineName,
            data.targetAgeMinMonths,
            data.targetAgeMaxMonths,
            data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
            data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate),
            data.location || ''
        );
    }
}