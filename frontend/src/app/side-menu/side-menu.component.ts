import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MenuService } from '../menu.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  user$: Observable<Partial<User>> = this.authService.user;

  constructor(public menuService: MenuService, private authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
