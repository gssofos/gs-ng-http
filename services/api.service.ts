import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GsHttpApiService {

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  api_url: string = '';

  constructor(private http: Http) {
    // this.api_url = environment.api_url;
  }

  private getText(response: Response) {
    return response.text();
  }

  public get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
      .catch(err => Observable.throw(err))
      .map(this.getText);
  }

}
