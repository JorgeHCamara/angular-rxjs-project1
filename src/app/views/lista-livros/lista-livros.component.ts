import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, throwError } from 'rxjs';
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

  foundBooks$ = this.searchField.valueChanges
    .pipe(
      debounceTime(DELAY),
      filter((value) => value.length >= 3),
      distinctUntilChanged(),
      switchMap((value) => this.service.searchBooksApi(value)),
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



