import { Injectable } from '@angular/core';
import Result from './Result';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  url = environment.baseUrl;

  constructor(private http: HttpClient){
  }

}
