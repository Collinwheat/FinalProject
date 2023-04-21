import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  //private baseUrl = 'http://localhost:8090/'; // adjust port to match server
private url = environment.baseUrl + 'api/trips';

constructor(private http: HttpClient, private datePipe: DatePipe, private auth: AuthService) { }


getHttpOptions() {
  let options = {
    headers: {
      Authorization: 'Basic ' + this.auth.getCredentials(),
      'X-Requested-With': 'XMLHttpRequest',
    },
  };
  return options;
}


create(trip:Trip):Observable <Trip>{

  return this.http.post<Trip>(this.url, trip).pipe(
    catchError((err: any)=>{
      console.error(err);
      return throwError(
        ()=> new Error('companyService.create(): error creating Company'+ trip)
      )
    })
)

}

index(): Observable<Trip[]>{
  return this.http.get<Trip[]>(this.url).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError(
        () => new Error('TripService.index(): error retrieving trips: ' + err)
      );
    })
  )
}

update(trip:Trip){

}














}