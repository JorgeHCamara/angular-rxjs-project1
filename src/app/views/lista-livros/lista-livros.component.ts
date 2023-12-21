import { Book, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Book[];
  searchField: string = '';
  subscription: Subscription;
  livro: Book;

  constructor(private service: LivroService) { }

  searchBooks() {
    this.subscription = this.service.searchBooksApi(this.searchField).subscribe({
      next: (items) => {
        this.listaLivros = this.booksResponseForBooks(items)
      },
      error: error => console.error(error),
    }
    );
  }

  booksResponseForBooks(items: Item[]): BookVolumeInfo[] {
    return items.map(item => {
      return new BookVolumeInfo(item)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



