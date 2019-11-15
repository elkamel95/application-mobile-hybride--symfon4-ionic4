import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {Medicament} from '../../Entity/Medicament';
import  {Alarme} from        '../../Entity/Alarme';
import {Utilisateur} from '../../Entity/Utilisateur';

import { MessageServiceProvider } from './MessageServiceProvider/MessageServiceProvider';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',})};

@Injectable()
export class Api{

  private baseUrl ='http://192.168.43.168:8080';// URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageServiceProvider ) { }

  /** GET Items from the server */
  getItems (endpoint: string): Observable<any[]> {
    const url = `${this.baseUrl}/${endpoint}`;
    console.log(url);
    return this.http.get<any[]>(url) ;
  }

  /** GET Item by id. Return `undefined` when id not found */
  getItemNo404<Data>(endpoint: string,id: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(Items => Items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ${endpoint} id=${id}`);
        }),
        catchError(this.handleError<any>(`get${endpoint} id=${id}`))
      );
  }
  /** GET Item by id. Will 404 if id not found */
  Login(endpoint :string,tel: any,Mmot:any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}/${tel}/${Mmot}`;
   console.log(url);
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched ${endpoint} id=${tel}`)),
      catchError(this.handleError<any>(`get${endpoint} id=${tel}`))
    );
  }
  /** GET Item by id. Will 404 if id not found */
  getItem(endpoint :string,id: any): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
   console.log(url);
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched ${endpoint} id=${id}`)),
      catchError(this.handleError<any>(`get${endpoint} id=${id}`))
    );
  }
    sendGmail(endpoint :string): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}`;
   console.log(url);
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched ${endpoint} `)),
      catchError(this.handleError<any>(`get${endpoint} `))
    );
  }
    getItemMedicamentPation(endpoint :string,id: any,idPatient): Observable<any> {
    const url = `${this.baseUrl}/${endpoint}/${id}/${idPatient}`;
   console.log(url);
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched ${endpoint} id=${id}`)),
      catchError(this.handleError<any>(`get${endpoint} id=${id}`))
    );
  }
  /* GET Items whose name contains search term */
  searchItemes(endpoint :string,term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty Item array.
      return of([]);
    }
    const url = `${this.baseUrl}${endpoint}/${term}`;
    return this.http.get<any[]>(url).pipe(
      tap(_ => this.log(`found ${endpoint}s matching "${term}"`)),
      catchError(this.handleError<any[]>(`search ${endpoint}s`, []))
    );
  }

  //////// Save methods //////////
  /** POST: add a new Item to the server */

  addItem (endpoint :string,Item: Medicament) {    
    const url = `${this.baseUrl}/${endpoint}/add`;
    console.log(url);
      this.http.post(url,JSON.stringify(Item),httpOptions);
return new Promise((resolve, reject) => {
         this.http.post(url,JSON.stringify(Item),httpOptions)
      .subscribe(res => {
        console.log(res);
        //   this.presentToast('Session has been Expired!');
        // }
      }, (err) => {
        reject(err);
      });
    });

     
  }
  addAny(endpoint :string,Item:Utilisateur) {    
    const url = `${this.baseUrl}/${endpoint}/add`;
      this.http.post(url,JSON.stringify(Item),httpOptions);
return new Promise((resolve, reject) => {
         this.http.post(url,JSON.stringify(Item),httpOptions)
      .subscribe(res => {
               console.log(res);

        //   this.presentToast('Session has been Expired!');
        // }
      }, (err) => {
        reject(err);
      });
    });

     
  }
    updateItem (endpoint :string,id:number,idPatient:number,Item: Medicament) {   


    const url = `${this.baseUrl}/${endpoint}/${id}/${idPatient}`;
      this.http.put(url,JSON.stringify(Item),httpOptions);
return new Promise((resolve, reject) => {
      this.http.put(url,JSON.stringify(Item),httpOptions)
      .subscribe(res => {
        console.log(res);
        //   this.presentToast('Session has been Expired!');
        // }
      }, (err) => {
        reject(err);
      });
    });

     
  }

   updateAlarme(endpoint :string,id:number,Item: Alarme) {   


    const url = `${this.baseUrl}/${endpoint}/${id}`;
    console.log(url);
      this.http.put(url,JSON.stringify(Item),httpOptions);
return new Promise((resolve, reject) => {
      this.http.put(url,JSON.stringify(Item),httpOptions)
      .subscribe(res => {
        console.log(res);
        //   this.presentToast('Session has been Expired!');
        // }
      }, (err) => {
        reject(err);
      });
    });

     
  }
/** POST: signup or loggin  a new User  to the server */
  loginAndSignup(endpoint: string, body: any):Observable<any> {
    const url = `${this.baseUrl}${endpoint}/`;
    return this.http.post<any>(url, body, httpOptions).pipe(
      tap((Item: any) => this.log(`user ${endpoint} w/ id=${Item.id}`)),
      catchError(this.handleError<any>(`user ${endpoint}`))
    );
  }


  /** DELETE: delete the Item from the server */
  deleteItem (endpoint :string,id:any) {
    const url = `${this.baseUrl}/remove/${endpoint}/${id}`;
    console.log(url);
    return new Promise((resolve, reject) => {
    this.http.delete<any>(url,httpOptions)
      .subscribe(res => {
        console.log(res);
        //   this.presentToast('Session has been Expired!');
        // }
      }, (err) => {
        reject(err);
      });
    });
    
  }
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ItemService message with the MessageServiceProvider  */
  private log(message: string) {
    this.messageService.add('ItemService: ' + message);
  }
}