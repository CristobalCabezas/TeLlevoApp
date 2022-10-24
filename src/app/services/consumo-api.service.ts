import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }

    apiURL = 'https://jsonplaceholder.typicode.com';
   

  constructor(public http:HttpClient) { }

  //Con este metodo obtenemos todos los valores de la api
  getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
    retry(3)
    );
    }
  
    //Metodon para realizar un put
  updatePost(id,post):Observable<any>{
    return this.http.put(this.apiURL+'/posts/'+id,post).pipe(
      retry(3)
      );
  }


   obtenerDatos(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}