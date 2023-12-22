import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, BooksResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  searchBooksApi(value: string): Observable<BooksResponse> {
    const params = new HttpParams().append('q', value)
    return this.http.get<BooksResponse>(this.API, { params })
  }
}
