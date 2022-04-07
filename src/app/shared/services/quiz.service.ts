import { IQuiz } from './../models/quiz';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}
  list(code: string): Observable<any> {
    return this.http.get<any>(`${environment.quiz_api}/${code}`);
  }
  findByName(code: string, keyword: string = ''): Observable<any> {
    return this.http.get<any>(
      `${environment.quiz_api}/${code}?Text_like=${keyword}`
    );
  }
  findById(code: string, id: number): Observable<any> {
    return this.http.get<any>(`${environment.quiz_api}/${code}?Id=${id}`);
  }
  addNew(code: string, data: IQuiz): Observable<any> {
    return this.http.post<any>(`${environment.quiz_api}/${code}`, { ...data });
  }
  delete(code: string, id: string): Observable<any> {
    return this.http.delete<any>(`${environment.quiz_api}/${code}/${id}`);
  }
}
