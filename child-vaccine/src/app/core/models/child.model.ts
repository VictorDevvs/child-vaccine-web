export type Gender = 'male' | 'female'

export class Child {
    constructor(
    public id: string,
    public name: string,
    public birthDate: Date,
    public gender: Gender,
    public ownerId: string,
    public avatarColor: string = '#ABC270'
    ){}

    getAgeInMonths(): number {
        const now = new Date();
        const months = (now.getFullYear() - this.birthDate.getFullYear()) * 12 +
        (now.getMonth() - this.birthDate.getMonth());
        return months < 0 ? 0 : months;
    }

    getAgeLabel(): string {
        const months = this.getAgeInMonths();
        if (months < 24) {
            return `${months} ${months === 1 ? 'month' : 'months'}`;
        }

        const years = Math.floor(months / 12);
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    }

    static fromFirestore(id: string, data: any): Child {
    return new Child(
      id,
      data.name,
      data.birthDate?.toDate ? data.birthDate.toDate() : new Date(data.birthDate),
      data.gender,
      data.ownerId,
      data.avatarColor ?? '#ABC270'
    );
  }

    toFirestore(): any {
    return {
      name: this.name,
      birthDate: this.birthDate,
      gender: this.gender,
      ownerId: this.ownerId,
      avatarColor: this.avatarColor
    };
  }
}
