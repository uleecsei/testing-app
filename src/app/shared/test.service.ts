import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Test {
  test: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  url = environment.baseUrl

  constructor(private http: HttpClient) {
  }

  getTest() {
    return this.http.get<Test>(this.url + '/api/test');
  }
}
