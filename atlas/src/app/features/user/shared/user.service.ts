import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/users';
  constructor(private http : HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
    .pipe(
      tap(users => console.log(JSON.stringify(users))),
      catchError(this.handleError)
    )
  }

  createUser(user : User):Observable<User> {
    user.id = null;
    return this.http.post<User>(this.userUrl,user, {headers: headers})
    .pipe(
      tap(user => console.log(JSON.stringify(user))),
      catchError(this.handleError)
    )
  }
  deleteUser(id : number): Observable<{}> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<User>(url, { headers : headers})
    .pipe(
      tap(data => console.log('deleteProduct: ' + id)),
      // tap(data => {
      //   const foundIndex = this.products.findIndex(item => item.id === id);
      //   if (foundIndex > -1) {
      //     this.products.splice(foundIndex, 1);
      //   }
      // }),
      catchError(this.handleError)
    );
  }

  updateUser(user : User) : Observable<User> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<User>(url, user, { headers: headers })
      .pipe(
        tap(() => console.log('updateUser: ' + user.id)),
        map(() => user),
        catchError(this.handleError)
      );
  }


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
