const url = 'http://127.0.0.1:8081/api/v1';

export function authenticatedgetreq(smethod:string) : XMLHttpRequest{
    const req = new XMLHttpRequest();
    req.open('GET', url + '/' + smethod, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return req;
}

export function authenticatedpostreq(smethod:string) : XMLHttpRequest{
    const req = new XMLHttpRequest();
    req.open('POST', url + '/' + smethod, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return req;
}

export function authenticatedpostfilereq(smethod:string) : XMLHttpRequest{
    const req = new XMLHttpRequest();
    req.open('POST', url + '/' + smethod, true);
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return req;
}

export function authenticateddeletereq(smethod:string) : XMLHttpRequest{
    const req = new XMLHttpRequest();
    req.open('DELETE', url + '/' + smethod, true);
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return req;
}