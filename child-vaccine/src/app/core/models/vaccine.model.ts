export interface VaccineDoseSchedule {
    doseNumber: number;
    recommendedAgeInMonths: number;
    description: string;
}

export class Vaccine {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public doses: VaccineDoseSchedule[]
    ) {}

    getDose(doseNumber: number): VaccineDoseSchedule | undefined {
        return this.doses.find(dose => dose.doseNumber === doseNumber);
    }

    getTotalDoses(): number {
        return this.doses.length;
    }

    static fromFirestore(id: string, data: any): Vaccine {
        return new Vaccine(id, data.name, data.description, data.doses ?? []);
    }
}