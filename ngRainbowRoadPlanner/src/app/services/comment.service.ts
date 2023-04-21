import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


   //private baseUrl = 'http://localhost:8090/'; // adjust port to match server
private url = environment.baseUrl + 'api/activities';


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


create(comment: Comment):Observable <Comment>{

  return this.http.post<Comment>(this.url, comment, this.getHttpOptions()).pipe(
    catchError((err: any)=>{
      console.error(err);
      return throwError(
        ()=> new Error('tripService.create(): error creating Trip'+ comment)
      )
    })
)

}

index(): Observable<Comment[]>{
  return this.http.get<Comment[]>(this.url, this.getHttpOptions()).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError(
        () => new Error('TripService.index(): error retrieving trips: ' + err)
      );
    })
  )
}

update(comment: Comment): Observable<Comment>{

  return this.http.put<Comment>(this.url+ comment.id, this.getHttpOptions()).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError(
        () => new Error('TripService.index(): error update trip: ' + err)
      );
    })

  )

}


}
