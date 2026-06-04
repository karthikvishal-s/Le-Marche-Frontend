import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // 👈 Import Routing tools
  template: `
    <header class="navbar">
      <h1>Fidelity Management System</h1>
      <nav class="nav-links">
        <a routerLink="/product" routerLinkActive="active-link">Inventory</a>
        <a routerLink="/customer" routerLinkActive="active-link">Customers</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet> 
    </main>
  `,
  styles: [`
    .navbar {
      background: #005a87;
      color: white;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    .navbar h1 { margin: 0; font-size: 1.5rem; }
    .nav-links a {
      color: white;
      text-decoration: none;
      margin-left: 20px;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 4px;
    }
    .nav-links a:hover { background: #003e5c; }
    .active-link { background: #003e5c; border-bottom: 2px solid #fff; }
    main { padding: 20px; }
  `]
})
export class AppComponent {
  // Look how clean this is! No logic needed here anymore.
}