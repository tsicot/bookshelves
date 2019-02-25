import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../Models/Book.model';
import {Subscription} from 'rxjs';
import {BooksService} from '../services/books.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;
  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.booksService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(bookToRemove: Book) {
    this.booksService.removeBook(bookToRemove);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', id]);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
