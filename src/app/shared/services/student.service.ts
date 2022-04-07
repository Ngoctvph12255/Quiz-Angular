import { IStudent } from './../models/student';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  list(keyword: string = ''): Observable<any> {
    return this.http.get<any>(
      `${environment.student_api}?email_like=${keyword}`
    );
  }
  addNew(data: any): Observable<any> {
    return this.http.post<any>(environment.student_api, { ...data });
  }

  update(data: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.student_api}/${id}`, { ...data });
  }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.student_api}/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(environment.student_api);
  }
  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.student_api}/${id}`);
  }
}
