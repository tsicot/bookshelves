import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {Book} from '../../Models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileURL: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required]
    });
  }

  onSaveBook() {
    const titre = this.bookForm.get('titre').value;
    const auteur = this.bookForm.get('auteur').value;
    const newBook = new Book(titre, auteur);
    if (this.fileURL && this.fileURL !== '') {
      newBook.photo = this.fileURL;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileURL = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
