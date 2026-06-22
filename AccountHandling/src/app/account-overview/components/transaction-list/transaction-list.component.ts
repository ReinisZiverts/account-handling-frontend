import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import {MatList, MatListItem, MatListItemLine, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {AccountRestService} from '../../../service/account.rest-service';
import {Transaction} from '../../../models/transaction';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BalanceChartComponent} from '../balance-chart/balance-chart.component';
import {CurrencyPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ToastService} from '../../../core/service/toast.service';
import {ToastTypeEnum} from '../../../core/enum/toast-type.enum';

@Component({
  selector: 'transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrl: 'transaction-list.component.scss',
  imports: [
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    BalanceChartComponent,
    CurrencyPipe,
    MatIconButton,
    MatIcon,
    MatListItemMeta
  ],
})
export class TransactionListComponent implements OnInit {

  accountId = input.required<number>();

  protected readonly isLoadingTransactions = signal(false);
  protected readonly hasMoreTransactions = signal(true);
  protected transactions: WritableSignal<Transaction | null> = signal<Transaction | null>(null);
  private readonly pageSize = 5;
  private currentPage = 0;
  private readonly accountRestService: AccountRestService = inject(AccountRestService);
  private readonly router: Router = inject(Router);
  private readonly toastService: ToastService = inject(ToastService);

  ngOnInit(): void  {
    this.loadMoreTransactions();
  }

  protected onTransactionClick(transactionId: number): void {
    void this.router.navigateByUrl(`/account/${this.accountId()}/transaction-overview/${transactionId}`);
  }

  protected onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    const threshold = 80;
    const position = element.scrollTop + element.clientHeight;
    const height = element.scrollHeight;

    if (position >= height - threshold) {
      this.loadMoreTransactions();
    }
  }

  private loadMoreTransactions(): void {
    if (this.isLoadingTransactions() || !this.hasMoreTransactions()) {
      return;
    }

    this.isLoadingTransactions.set(true);

    this.accountRestService.getAccountTransactions(this.accountId(), this.currentPage, this.pageSize)
      .subscribe({
        next: (transactions) => {
          const current = this.transactions();
          if (!current) {
            this.transactions.set(transactions);
          } else {
            this.transactions.set({
              ...current,
              accountTransactions: [
                ...current.accountTransactions,
                ...transactions.accountTransactions
              ],
            });
          }

          if (transactions.accountTransactions.length < this.pageSize) {
            this.hasMoreTransactions.set(false);
          }

          this.currentPage++;
          this.isLoadingTransactions.set(false);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoadingTransactions.set(false);
          this.toastService.open(
            "Could not load transactions.",
            "Close",
            ToastTypeEnum.ERROR
          );
          console.error(error);
        }
      })
  }

}
