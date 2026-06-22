import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AccountRestService} from '../../service/account.rest-service';
import {Account} from '../../models/account';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {AccountCardComponent} from '../component/account-card/account-card.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrl: 'landing-page.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    AccountCardComponent
  ],
})
export class LandingPageComponent implements OnInit {

  protected accounts: WritableSignal<Account[]> = signal<Account[]>([]);
  private readonly accountService: AccountRestService = inject(AccountRestService);

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe({
        next: (accounts: Account[]) => this.accounts.set(accounts),
        error: (error: HttpErrorResponse) => console.error(error)
      });
  }

}
