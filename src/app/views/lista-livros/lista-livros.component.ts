import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchField = new FormControl()
  foundBooks$ = this.searchField.valueChanges
    .pipe(
      switchMap((value) => this.service.searchBooksApi(value)),
      map(items => this.booksResponseForBooks(items))
    )

  constructor(private service: LivroService) { }

  booksResponseForBooks(items: Item[]): BookVolumeInfo[] {
    return items.map(item => {
      return new BookVolumeInfo(item)
    })
  }

}



