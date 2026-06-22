import {AccountTransaction} from './account-transaction';

export interface Transaction {

  accountName: string;
  accountTransactions: AccountTransaction[];

}
