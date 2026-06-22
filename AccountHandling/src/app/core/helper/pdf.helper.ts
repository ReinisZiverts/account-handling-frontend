import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AccountTransaction } from '../../models/account-transaction';

export class PdfHelper {

  private static readonly TITLE_FONT_SIZE = 22;
  private static readonly SECTION_TITLE_FONT_SIZE = 14;
  private static readonly DEFAULT_FONT_SIZE = 11;
  private static readonly DEFAULT_ALIGNMENT = 'center';
  private static readonly AUTO_FILL_WIDTH = "*";

  static print(definition: TDocumentDefinitions) {
    this.registerFonts();
    void pdfMake.createPdf(definition).download(`transaction.pdf`);
  }

  static createPdfListDefinition(data: AccountTransaction): TDocumentDefinitions {
    const header: Content = this.createPdfHeader();
    const summary: Content = this.createTransactionSummary(data);
    const details: Content = this.createTransactionDetails(data);

    return {
      pageMargins: [40, 50, 40, 50],
      content: [
        header,
        summary,
        details,
      ],
      styles: {
        header: {
          fontSize: this.TITLE_FONT_SIZE,
          bold: true,
          alignment: this.DEFAULT_ALIGNMENT,
          margin: [0, 0, 0, 24],
        },
        sectionTitle: {
          fontSize: this.SECTION_TITLE_FONT_SIZE,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
      defaultStyle: {
        fontSize: this.DEFAULT_FONT_SIZE,
      },
    };
  }

  private static registerFonts(): void {
    pdfMake.addVirtualFileSystem(pdfFonts);
  }

  private static createPdfHeader(): Content {
    return {
      text: "Transaction Summary",
      style: 'header',
    };
  }

  private static createTransactionSummary(transaction: AccountTransaction): Content {
    return {
      table: {
        widths: [this.AUTO_FILL_WIDTH],
        body: [
          [
            {
              stack: [
                {
                  text: transaction.transactionType,
                  fontSize: 18,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 0, 0, 8],
                },
                {
                  text: this.formatCurrency(transaction.amount, transaction.currency),
                  fontSize: 26,
                  bold: true,
                  alignment: 'center',
                  color: this.getAmountColor(transaction.amount),
                  margin: [0, 0, 0, 8],
                },
                {
                  text: `Transaction ID: ${transaction.id}`,
                  alignment: 'center',
                  color: '#666666',
                },
              ],
              margin: [20, 18, 20, 18],
            },
          ],
        ],
      },
      margin: [0, 0, 0, 24],
    };
  }

  private static createTransactionDetails(transaction: AccountTransaction): Content {
    return {
      stack: [
        {
          text: 'Transaction Details',
          style: 'sectionTitle',
        },
        {
          table: {
            widths: ['40%', '60%'],
            body: [
              this.createDetailRow('Transaction ID', transaction.id.toString()),
              this.createDetailRow('Transaction Type', transaction.transactionType),
              this.createDetailRow('Amount', this.formatCurrency(transaction.amount, transaction.currency)),
              this.createDetailRow('Balance After Transaction', this.formatCurrency(transaction.balanceAfter, transaction.currency)),
              this.createDetailRow('Transaction Date', this.formatDate(transaction.createdOn)),
            ],
          },
        },
      ],
    };
  }

  private static createDetailRow(label: string, value: string): Content[] {
    return [
      {
        text: label,
        style: 'label',
        margin: [8, 8, 8, 8],
      },
      {
        text: value,
        style: 'value',
        margin: [8, 8, 8, 8],
      },
    ];
  }

  private static formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('lv', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  private static formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('lv', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }

  private static getAmountColor(amount: number): string {
    return amount < 0 ? '#c62828' : '#2e7d32';
  }

}
