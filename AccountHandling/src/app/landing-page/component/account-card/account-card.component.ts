import {Component, inject, input, InputSignal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Account} from '../../../models/account';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'account-card',
  templateUrl: 'account-card.component.html',
  styleUrl: 'account-card.component.scss',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    CurrencyPipe
  ]
})
export class AccountCardComponent {

  account: InputSignal<Account> = input.required<Account>();

  private router: Router = inject(Router);

  protected navigateToAccount() {
    void this.router.navigateByUrl("/account-overview/" + this.account().id);
  }

}
