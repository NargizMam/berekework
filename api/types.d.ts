export interface Vacancy {
    _id: string;
    title: string;
    description: string;
    logo: string | null;
    company: string;
    city: string;
    salary: {
        min: number | null;
        max: number | null;
    };
}

export type VacancyMutation = Omit<Vacancy, '_id'>;



