import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {AccountRestService} from '../../service/account.rest-service';
import {Transaction} from '../../models/transaction';
import {HttpErrorResponse} from '@angular/common/http';
import {Account} from '../../models/account';
import {AccountTransaction} from '../../models/account-transaction';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TDocumentDefinitions} from 'pdfmake/interfaces';
import {PdfHelper} from '../../core/helper/pdf.helper';

@Component({
  templateUrl: 'transaction-overview-page.component.html',
  styleUrl: 'transaction-overview-page.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    CurrencyPipe,
    DatePipe,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatIcon
  ]
})
export class TransactionOverviewPageComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  protected readonly transactionId: number = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly accountId: number = Number(this.route.snapshot.paramMap.get('accountId'));
  protected readonly transaction: WritableSignal<AccountTransaction | null> = signal<AccountTransaction | null>(null);
  private readonly router: Router = inject(Router);
  private readonly accountRestService = inject(AccountRestService);

  ngOnInit(): void {
    this.accountRestService.getTransactionInfo(this.transactionId, this.accountId)
      .subscribe({
        next: (transaction) => this.transaction.set(transaction),
        error: (error: HttpErrorResponse) => console.error(error)
      })
  }

  protected goBack(): void {
    void this.router.navigateByUrl(`/account-overview/${this.accountId}`);
  }

  protected printSummary() {
      const pdfDefinition: TDocumentDefinitions = PdfHelper.createPdfListDefinition(this.transaction()!);
      PdfHelper.print(pdfDefinition);
  }

}
