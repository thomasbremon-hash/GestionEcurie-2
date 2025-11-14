import { Component } from '@angular/core';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AdminNavbar, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {}
