import {authenticateddeletereq, authenticatedgetreq, authenticatedpostreq } from '@/services/authenticationservice';
import type Sportklasse from '@/types/Sportklasse';
import type Sporttag from '@/types/Sporttag';
import type Student from '@/types/Student';

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