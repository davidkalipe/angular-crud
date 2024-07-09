import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DialogBodyComponent} from './dialog-body/dialog-body.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule, MatDialogActions, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8080';
  title = 'angular-dialog';
  constructor(private matDialog: MatDialog){}
  openDialog(){
    this.matDialog.open(DialogBodyComponent,{
      width: '350px',
    })
  }

  booksForm = new FormGroup({
    id: new FormControl<string>(''),
    title: new FormControl<string>(''),
    author: new FormControl<string>(''),
  })

  books$ = this.getAllBooks();

  onFormSubmit(){
    const addBookRequest = {
      title: this.booksForm.value.title,
      author: this.booksForm.value.author
    }

    this.http.post(`${this.baseUrl}/addBook`, addBookRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.books$ = this.getAllBooks();
          this.booksForm.reset();
        }
      })
  }

  updateFormSubmit(id: string){
    const updateBookRequest = {
      id: this.booksForm.value.id,
      title: this.booksForm.value.title,
      author: this.booksForm.value.author
    }
    this.http.put(`${this.baseUrl}/updateBook/${id}`, updateBookRequest)
      .subscribe({
        next: (value) =>{
          this.books$ = this.getAllBooks();
          this.booksForm.reset();
        }
      })
  }



  onDelete(id: string){
    this.http.delete(`${this.baseUrl}/deleteBook/${id}`)
      .subscribe({
        next: (value) => {
          alert("Book deleted");
          this.books$ = this.getAllBooks();
        }
      })
  }


  private getAllBooks(): Observable<Book[]>{
    return  this.http.get<Book[]>(`${this.baseUrl}/getAllBooks`);
  }
}
