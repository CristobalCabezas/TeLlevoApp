import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Datos } from '../interfaces/datos';
//import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {

  /*headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };*/

 
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }

    public api = 'http://localhost:3000/historial';

    apiURL = 'http://localhost:3000/historial';
   

  constructor(public http:HttpClient) { }

  //Con este metodo obtenemos todos los valores de la api
  getPosts():Observable<any>{
    return this.http.get(this.apiURL).pipe(
    retry(3)
    );
    }
  
    //Metodon para realizar un put
  /*updatePost(id,post):Observable<any>{
    return this.http.put(this.apiURL+'/posts/'+id,post).pipe(
      retry(3)
      );
  }*/

  //Metodo para obtener datos
  getAllTasks() {
    const path = `${this.api}`;
    return this.http.get<Datos[]>(path);
  }

  /*Metodo para crear un dato en la api 
  createTask(task: Datos) {
    const path = `${this.api}`;
    return this.http.post(path, task);
  }

  updateTask(id: number, task: Datos) {
    const path = `${this.api}/${task.id}`;
    return this.http.put<Datos>(path, task).pipe(map(() => id));
  }

  getUpdateUser(id: number): Observable<Users> {
    const path = `${this.api}/${id}`;
    return this.http.get<Users>(this.api, this.httpOptions);
  }

  updateUser(user: Users): Observable<Users>{
    const path = `${this.api}/${user.id}`;
    return this.http.put<Users>(this.api, user, this.httpOptions).pipe(map(() => user)
    );
  }*/

  getPostById(id: string) {
    return this.http.get<Datos>(`${this.api}/${id}`);
  }

  createPost(fecha: string, origen: string, destino: string, conductor: string, cupo: number) {
    return this.http.post<Datos[]>(this.api, {
      fecha,
      origen,
      destino,
      conductor,
      cupo 
    });
  }

  removePost(id: string) {
    return this.http.delete<Datos>(`${this.api}/${id}`);
  }

  updatePost(id: string, post: Datos) {
    //const path = `${this.api}/${post.id}`;
    return this.http.put(`${this.api}/${id}`, post);
    //return this.http.put<Datos>(path, post);
  }

   obtenerDatos(){
    return this.http.get('./assets/db.json');
  }
}