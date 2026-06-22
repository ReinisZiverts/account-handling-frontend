export interface AccountTransaction {

  id: number;
  transactionType: string;
  amount: number;
  currency: string;
  balanceAfter: number;
  createdOn: Date;

}
