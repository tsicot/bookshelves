import { Component, OnInit } from '@angular/core';
import {Book} from '../../Models/Book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
book: Book;
  constructor(private activatedRoute: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.activatedRoute.snapshot.params.id;
    this.booksService.getBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
