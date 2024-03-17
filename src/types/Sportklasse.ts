import type Sportlehrer from "./Sportlehrer";

export default interface Sportklasse {
    id: number;
    klassenname: string;
    sportlehrer: Sportlehrer;
}