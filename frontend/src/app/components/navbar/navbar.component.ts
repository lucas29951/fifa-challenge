import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
      const token = this.authService.getToken();

      if (token) {
        this.isLoggedIn = true;

        const storedName = localStorage.getItem('userName');
        if (storedName) {
          this.userName = storedName;
        }
      }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
    this.router.navigate(['/login']);
  }
}
