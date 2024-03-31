export function formatDate(d: string | undefined){
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    };
    if(d === undefined){
        return ''
    }
    const date = new Date(d);
    date.setHours(0,0,0,0);
    const dateFormatter = new Intl.DateTimeFormat("de-CH", options).format; 
    return dateFormatter(date);
}

export function datereviver(key:string, value:string) {
    if (key === 'geburtsdatum') {
        // value is already a string here, but we can access the 
        // original property
        return new Date(value);
    }
    return value;
}