import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountRestService} from '../../service/account.rest-service';
import {Account} from '../../models/account';
import {Transaction} from '../../models/transaction';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {TransactionListComponent} from '../components/transaction-list/transaction-list.component';
import {BalanceChartComponent} from '../components/balance-chart/balance-chart.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';

@Component({
  templateUrl: 'account-overview-page.component.html',
  styleUrl: 'account-overview-page.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    TransactionListComponent,
    BalanceChartComponent,
    MatCardTitle,
    MatCardHeader,
    MatIcon,
    MatIconButton,
    CurrencyPipe
  ]
})
export class AccountOverviewPageComponent implements OnInit {

  protected accountInformation: WritableSignal<Account | null> = signal<Account | null>(null);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly accountId: number = Number(this.route.snapshot.paramMap.get('id'));
  private readonly router: Router = inject(Router);
  private readonly accountRestService = inject(AccountRestService);

  ngOnInit(): void {
    this.accountRestService.getAccountInformation(this.accountId!)
      .subscribe({
        next: (account) => this.accountInformation.set(account),
        error: (error) => console.error(error)
      });
  }

  protected goBack(): void {
    void this.router.navigateByUrl('');
  }

}
