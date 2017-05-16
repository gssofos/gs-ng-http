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

  public setBaseUrl(url: string) {
    this.api_url = url;
  }

  private getText(response: Response) {
    return response.text();
  }


  private getJson(response: Response) {
    //  console.log(response)
    return response.json();
  }


  private checkForError(response: Response): Response | Observable<any> {
    // console.log(response)
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText)
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }



  public httpGET(path: string, responseType: 'text' | 'json' = 'text') {

    switch (responseType) {
      case 'text':
        return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getText).toPromise();
      case 'json':
        return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getJson).toPromise();
    }

  }



  public httpPOST(path: string, body: any, responseType: 'text' | 'json' = 'text') {

    switch (responseType) {
      case 'text':
        return this.http.post(
          `${this.api_url}${path}`,
          JSON.stringify(body),
          { headers: this.headers }
        )
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getText).toPromise();
      case 'json':
        return this.http.post(
          `${this.api_url}${path}`,
          JSON.stringify(body),
          { headers: this.headers }
        )
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getJson).toPromise();
    }

  }



  httpDELETE(path: string, responseType: 'text' | 'json' = 'text') {

    switch (responseType) {
      case 'text':
        return this.http.delete(
          `${this.api_url}${path}`,
          { headers: this.headers }
        )
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getText).toPromise();
      case 'json':
        return this.http.delete(
          `${this.api_url}${path}`,
          { headers: this.headers }
        )
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getJson).toPromise();
    }

  }


  public setHeaders(headers: any) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

}
