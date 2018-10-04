import {URL} from "../constants/index";

let jwtDecode = require('jwt-decode');
let __headers={"Content-Type":"application/json"};
let ACCESS_TOKEN;

export const doLogin=(l,p)=> new Promise((res, rej)=>{
  console.log('login = ', l, 'password = ', p )
    fetch(URL.host+"/users/login", {
        method:'POST',
        headers:{
            ...__headers
        },
        body:JSON.stringify({"email":l,"password":p})
    }).then(
        (resp)=>{
            if(resp.status !== 200) return Promise.reject(resp.status);
            else return resp.text();
        }
    )
        .then(
            (d)=>{
                ACCESS_TOKEN = d;
                __headers.Authorization = d;
                res(jwtDecode(d));
            }
        )
        .catch(
            (err)=>{
                rej(err);
            }
        )
});

export const fetchAllRounds = () => new Promise((res, rej) =>{
    fetch(URL.host+"/api/tournee", {
        method:'GET',
        headers:{
            ...__headers
        }
    }).then(
        (resp)=>{
            if(resp.status !== 200) return Promise.reject(resp.status);
            else return resp.json();
        }
    )
        .then(
            (d)=>{
                res(d);
            }
        )
        .catch(
            (err)=>{
                rej(err);
            }
        )
});

export const fetchIntervention = (interventionId) => new Promise((res, rej) =>{
    fetch(URL.host+"/api/intervention/"+interventionId, {
        method:'GET',
        headers:{
            ...__headers
        }
    }).then(
        (resp)=>{
            if(resp.status !== 200) return Promise.reject(resp.status);
            else return resp.json();
        }
    )
        .then(
            (d)=>{
                res(d);
            }
        )
        .catch(
            (err)=>{
                rej(err);
            }
        )
});

export const fetchEvenement = (evenementId) => new Promise((res, rej) =>{
    fetch(URL.host+"/api/evenement/"+evenementId, {
        method:'GET',
        headers:{
            ...__headers
        }
    }).then(
        (resp)=>{
            if(resp.status !== 200) return Promise.reject(resp.status);
            else return resp.json();
        }
    )
        .then(
            (d)=>{
                res(d);
            }
        )
        .catch(
            (err)=>{
                rej(err);
            }
        )
});


export const fetchPdfInterId = (pdfInterId) => new Promise((res, rej) =>{
    fetch(URL.host+"/api/pdf/"+pdfInterId, {
        method:'GET',
        headers:{
            ...__headers
        }
    }).then(
        (resp)=>{
            if(resp.status !== 200) return Promise.reject(resp.status);
            else return resp.blob();
        }
    )
        .then(
            (d)=>{
                res(d);
            }
        )
        .catch(
            (err)=>{
                rej(err);
            }
        )
});

export const getEvenementImage = (imageId) => {
    return URL.host+ "/image/" + imageId + "?token=" + getAccessToken()
};

export const getAccessToken = () => {
    return ACCESS_TOKEN;
};


