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

    /*constructor(id: number|undefined,
        vorname: string,
        nachname: string,
        geschlecht: string,
        geburtsdatum: string,
        klasse: string,
        sportklasse: string,
        sportklassenId: number,
        sportlehrerKuerzel: string){
            this.id = id;
            this.vorname = vorname;
            this.nachname = nachname;
            this.geschlecht = geschlecht;
            this.geburtsdatum = new Date(geburtsdatum);
            this.klasse = klasse;
            this.sportklasse = sportklasse;
            this.sportklassenId = sportklassenId;
            this.sportlehrerKuerzel = sportlehrerKuerzel;
        }*/
}