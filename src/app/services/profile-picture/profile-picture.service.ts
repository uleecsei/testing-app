import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'multipart/form-data'}),
};

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public postHttp(file: FormData): Observable<any> {
    return this.http.put<FormData>(
      `${this.url}/api/photo/`, file);
  }
}
