import { Component } from '@angular/core';
import { RouterOutlet, RouterLink , Router} from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MatSidenav, MatSidenavModule, MatToolbarModule, MatIconModule, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}
  
  title = 'VegetableAndFruitShop';
  isLoggedIn = false;

  ngOnInit() : void{
    this.checkLogin()
  }

  checkLogin() : void{
    this.isLoggedIn=localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  isActive(link: string): boolean {
    return this.router.url.includes(link);
  }
}
