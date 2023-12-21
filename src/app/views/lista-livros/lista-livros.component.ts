import { Book } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  booksResponseForBooks(items): Book[] {
    const books: Book[] = [];

    items.forEach(item => {
      books.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
      })
    })
    return books;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



