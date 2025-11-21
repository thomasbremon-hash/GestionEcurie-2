import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterModule],
  templateUrl: 'app.html',
})
export class AppComponent {}
