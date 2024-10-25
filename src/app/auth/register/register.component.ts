import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formData: Partial<iUser> = {};

  constructor(private authSvc: AuthService, private router: Router) {}

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  register() {
    this.authSvc.register(this.formData).subscribe((res) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
