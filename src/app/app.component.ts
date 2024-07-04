import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);

  books$ = this.getAllBooks();

  private getAllBooks(): Observable<Book[]>{
    return  this.http.get<Book[]>('https://localhost:8080/getAllBooks');

  }
}
