import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../../auth/auth.service';

const routes: Routes = [{ path: '', component: ProfilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {
  users: iUser[] = [];

  constructor(private authSvc: AuthService) {}
}
