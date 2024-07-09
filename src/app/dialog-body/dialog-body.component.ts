import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-body',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogContent
  ],
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css'
})
export class DialogBodyComponent {

}
