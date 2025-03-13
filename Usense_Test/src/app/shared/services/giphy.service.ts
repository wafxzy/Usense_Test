import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GIFLIMIT } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class GiphyService {

  constructor(private http: HttpClient) {}

 public searchGifs(query: string): Observable<any> {
    return this.http.get<any>(
      `${environment.giphyUrl}?api_key=${environment.apiKey}&q=${query}&limit=${GIFLIMIT}&rating=g`,
    );
  }
}
