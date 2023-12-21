import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  searchField: string = '';
  subscription: Subscription;

  constructor(private service: LivroService) { }

  searchBooks() {
    this.subscription = this.service.searchBooksApi(this.searchField).subscribe({
      next: apiReturn => console.log(apiReturn),
      error: error => console.error(error),
      complete: () => console.log('Observable completado')
    }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



