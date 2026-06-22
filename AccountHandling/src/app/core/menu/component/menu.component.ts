import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'menu.component.html',
  styleUrl: 'menu.component.scss',
  imports: [
    MatToolbar,
    RouterLink,
    MatIcon,
    MatIconButton
  ],
})
export class MenuComponent {

  private readonly authorizationService: AuthorizationService = inject(AuthorizationService);

  protected logout(): void {
    this.authorizationService.logout();
  }

}
