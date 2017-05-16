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



  public httpGET(params: { url?: string, responseType?: 'text' | 'json' }) {
    params.responseType = params.responseType || 'text';
    params.url = params.url || '';

    switch (params.responseType) {
      case 'text':
        return this.http.get(`${this.api_url}${params.url}`, { headers: this.headers })
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getText).toPromise();
      case 'json':
        return this.http.get(`${this.api_url}${params.url}`, { headers: this.headers })
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getJson).toPromise();
    }

  }



  public httpPOST(params: { url?: string, body?: any, headers?: any, responseType?: 'text' | 'json' }) {

    params.responseType = params.responseType || 'text';
    params.url = params.url || '';
    params.body = params.body || '';

    let httpHeaders: Headers;
    if (params.headers) {
      let httpHeaders = new Headers();
      Object.keys(params.headers).forEach(header => httpHeaders.set(header, params.headers[header]));
    } else {
      let httpHeaders = this.headers;
    }

    switch (params.responseType) {
      case 'text':
        return this.http.post(
          `${this.api_url}${params.url}`,
          JSON.stringify(params.body),
          { headers: httpHeaders }
        )
          .map(this.checkForError)
          .catch(err => Observable.throw(err))
          .map(this.getText).toPromise();
      case 'json':
        return this.http.post(
          `${this.api_url}${params.url}`,
          JSON.stringify(params.body),
          { headers: httpHeaders }
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
