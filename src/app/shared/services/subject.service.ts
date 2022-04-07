import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type httpResponse = HttpResponse<any>;
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  list(keyword: string = ''): Observable<any> {
    return this.http.get<any>(
      `${environment.subject_api}?Name_like=${keyword}`
    );
  }

  finByCode(keyword: string = ''): Observable<any> {
    return this.http.get<any>(
      `${environment.subject_api}?Code_like=${keyword}`,
      { observe: 'response' }
    );
  } 
}
