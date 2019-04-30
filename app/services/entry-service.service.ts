import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {

  public entries: Entry[];
  constructor(private http: HttpClient) { }

  getEntries(token: string) {
    return this.http.get('http://www.healtheoz.co.in/sharedData/'+ token);
  }
}
