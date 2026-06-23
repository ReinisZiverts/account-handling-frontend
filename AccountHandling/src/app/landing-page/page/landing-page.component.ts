import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AccountRestService} from '../../service/account.rest-service';
import {Account} from '../../models/account';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {AccountCardComponent} from '../component/account-card/account-card.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../core/service/toast.service';
import {ToastTypeEnum} from '../../core/enum/toast-type.enum';

@Component({
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrl: 'landing-page.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    AccountCardComponent
  ],
})
export class LandingPageComponent implements OnInit {

  protected accounts: WritableSignal<Account[]> = signal<Account[]>([]);
  private readonly accountService: AccountRestService = inject(AccountRestService);
  private readonly toastService: ToastService = inject(ToastService);

  ngOnInit(): void {
    this.accountService.getAllAccounts()
      .subscribe({
        next: (accounts: Account[]) => this.accounts.set(accounts),
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.toastService.open(
            "Could not load account information.",
            "Close",
            ToastTypeEnum.ERROR
          );
        }
      });
  }

}
