import {authenticateddeletereq, authenticatedgetreq, authenticatedpostreq, authenticatedpostfilereq } from '@/services/authenticationservice';
import type Riegenzuteilung from '@/customtypes/Riegenzuteilung';
import type Sportklasse from '@/customtypes/Sportklasse';
import type Sporttag from '@/customtypes/Sporttag';
import type Student from '@/customtypes/Student';
import type Riege from '@/customtypes/Riege';

export function getSporttage(func: (sporttage: Sporttag[]) => void) {
    const authreq = authenticatedgetreq('sporttag');

    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Sporttag[]);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function getStudents(sporttagid:number, func: (students:Student[]) => void){
    const authreq = authenticatedgetreq('students/' + sporttagid);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Student[]);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function saveStudent(student: Student, func: () => void){
    const authreq = authenticatedpostreq('student');
    authreq.send(JSON.stringify(student));
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4){
            func();
        }
    }
}

export function getSportklassen(sporttagid:number, func: (sporttage:Sportklasse[]) => void){
    const authreq = authenticatedgetreq('sportklassen/' + sporttagid);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Sportklasse[]);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function deleteStudent(studentId:number, func: () => void){
    const authreq = authenticateddeletereq('student/' + studentId);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func();
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function getCurrentSporttag(func: (sporttag:Sporttag) => void){
    const authreq = authenticatedgetreq('currentsporttag');
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Sporttag);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function uploadExcel(file: File, sporttagid: String, func: () => void){
    const authreq = authenticatedpostfilereq('studentsFromExcel');
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("sporttagid", sporttagid.toString());

    authreq.send(fileData);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4){
            func();
        }
    }
}

export function getRiegenzuteilungen(sporttagid:number, func: (riegezuteilungs:Riegenzuteilung[]) => void){
    const authreq = authenticatedgetreq('riegenzuteilung/' + sporttagid);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Riegenzuteilung[]);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function getRieges(sporttagid:number, func: (riege: Riege[]) => void){
    const authreq = authenticatedgetreq('riege/' + sporttagid);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func(JSON.parse(authreq.response) as Riege[]);
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}

export function saveRiegenzuteilung(riegenzuteilung: Riegenzuteilung, sporttagId: number, func: () => void){
    console.log("Speichere Riegenzuteilung..")
    const authreq = authenticatedpostreq('riegenzuteilung');
    authreq.send(JSON.stringify({studentId: riegenzuteilung.studentId, riegeId: riegenzuteilung.riegeId, sporttagId: sporttagId}));
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4){
            console.log("Speichern erfolgreich.")
            func();
        }
    }
}

export function getRiegenExcel(sporttagId: number, func: () => void){
    const authreq = authenticatedgetreq('riegenExcel/' + sporttagId);
    authreq.onreadystatechange = function () {
        if (authreq.readyState == 4) {
            if (authreq.status == 200) {
                func();
            } else if (authreq.status == 403) {
                alert('Forbidden');
                return null;
            }
        }
    }
    authreq.send();
}