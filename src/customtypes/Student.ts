export default interface Student {
    id?: number;
    vorname: string;
    nachname: string;
    geschlecht: string;
    geburtsdatum?: string;
    klasse: string;
    sportklasse: string;
    sportklassenId: number;
    sportlehrerKuerzel: string;
}