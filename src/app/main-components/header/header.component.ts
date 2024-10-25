import { Component, inject, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //ts per far funzionare l'offcanvas
  private offcanvasService = inject(NgbOffcanvas);

  openStaticBackdrop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdrop: 'static' });
  }
  //

  users: iUser[] = [];

  isLoggedIn: boolean = false;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authSvc.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    console.log(this.users);
  }

  logout(): void {
    this.authSvc.logout();
  }
}
