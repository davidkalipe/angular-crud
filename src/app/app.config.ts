import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    // Déclarez vos composants ici, par exemple:
    // AppComponent,
    // EditBookDialogComponent,
    // BookListComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // Déclarez vos services ici si nécessaire
  ],
})
export class AppModule {}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
