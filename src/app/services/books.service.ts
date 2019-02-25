import {Injectable} from '@angular/core';
import {Book} from '../Models/Book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() {
  }

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books').on('value',
      (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getBook(id) {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      })
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(bookToRemove: Book) {
    if(bookToRemove.photo) {
      const storageRef = firebase.storage().refFromURL(bookToRemove.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const bookIndex = this.books.findIndex(
      (book) => {
        if (bookToRemove === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
          console.log('Chargement ...');
          },
          (error) => {
          console.log(error);
          reject(error);
          },
          () => {
          resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }
}
