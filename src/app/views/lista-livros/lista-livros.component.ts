import { FormControl } from '@angular/forms';
import { BooksResponse, Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, throwError } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { LivroService } from 'src/app/services/livro.service';

const DELAY = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchField = new FormControl();
  errorMessage = '';
  booksResponse: BooksResponse;

  // totalBooks$ = this.searchField.valueChanges
  // .pipe(
  //   debounceTime(DELAY),
  //   filter((value) => value.length >= 3),
  //   distinctUntilChanged(),
  //   switchMap((value) => this.service.searchBooksApi(value)),
  //   map(resp => this.booksResponse = resp),
  //   catchError(error => {
  //     console.log(error)
  //     return of()
  //   })
  // )

  foundBooks$ = this.searchField.valueChanges
    .pipe(
      debounceTime(DELAY),
      filter((value) => value.length >= 3),
      distinctUntilChanged(),
      switchMap((value) => this.service.searchBooksApi(value)),
      map(resp => this.booksResponse = resp),
      map(resp => resp.items ?? []),
      map(items => this.booksResponseForBooks(items)),
      catchError(error => {
        console.log(error)
        return throwError(() => new Error(this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
      })
    )

  constructor(private service: LivroService) { }

  booksResponseForBooks(items: Item[]): BookVolumeInfo[] {
    return items.map(item => {
      return new BookVolumeInfo(item)
    })
  }

}



