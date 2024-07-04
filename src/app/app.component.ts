import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);

  booksForm = new FormGroup({
    title: new FormControl<string>(''),
    author: new FormControl<string>(''),
  })

  books$ = this.getAllBooks();

  onFormSubmit(){
    const addBookRequest = {
      title: this.booksForm.value.title,
      author: this.booksForm.value.author
    }

    this.http.post('http://localhost:8080/addBook', addBookRequest)
      .subscribe({
        next: (value) =>{
          console.log(value);
          this.books$ = this.getAllBooks();
          this.booksForm.reset();
        }
      })
  }

  onDelete(id: string){
    this.http.delete(`http://localhost:8080/deleteBook/${id}`)
      .subscribe({
        next: (value) => {
          alert("Book deleted");
          this.books$ = this.getAllBooks();
        }
      })
  }


  private getAllBooks(): Observable<Book[]>{
    return  this.http.get<Book[]>('http://localhost:8080/getAllBooks');

  }
}
