import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {Observable} from 'rxjs';
import {Transaction} from '../models/transaction';
import {AccountTransaction} from '../models/account-transaction';

@Injectable({providedIn: 'root'})
export class AccountRestService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = "api/v1/accounts";

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }

  getAccountInformation(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  getAccountTransactions(accountId: number, page?: number, size?: number): Observable<Transaction> {
    const params: Record<string, string> = {};
    if (page !== undefined) {
      params['page'] = page.toString();
    }
    if (size !== undefined) {
      params['size'] = size.toString();
    }
    return this.http.get<Transaction>(`${this.baseUrl}/${accountId}/transactions`, {
      params,
    });
  }

  getTransactionInfo(transactionId: number, accountId: number): Observable<AccountTransaction> {
    return this.http.get<AccountTransaction>(`${this.baseUrl}/${accountId}/transactions/${transactionId}`);
  }

}
