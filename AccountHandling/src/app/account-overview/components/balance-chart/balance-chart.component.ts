import {AfterViewInit, Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'chart.js/auto';
import {AccountTransaction} from '../../../models/account-transaction';
import {AccountRestService} from '../../../service/account.rest-service';
import dayjs from 'dayjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'balance-chart',
  templateUrl: 'balance-chart.component.html'
})
export class BalanceChartComponent implements AfterViewInit, OnDestroy {

  accountId = input.required<number>();

  private trendChart?: Chart;
  private readonly accountRestService: AccountRestService = inject(AccountRestService);

  ngAfterViewInit(): void {
    this.accountRestService.getAccountTransactions(this.accountId())
      .subscribe({
        next:(transactions) => {
          this.renderChart(transactions.accountTransactions)
        },
        error: (error: HttpErrorResponse) => console.error(error)
      });
  }

  ngOnDestroy(): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }
  }


  private renderChart(transactions: AccountTransaction[]): void {
    const canvas = document.getElementById('balance-chart') as HTMLCanvasElement;

    if (!canvas) {
      return;
    }

    transactions.sort((a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime());
    const label: string[] = transactions.map((point) =>
      dayjs(point.createdOn).format('DD.MM.YYYY HH:mm')
    );
    const data: number[] = transactions.map((point) => point.balanceAfter);

    this.trendChart?.destroy();

    this.trendChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Historic account balance',
            data: data,
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.16)',
            pointBackgroundColor: '#3f51b5',
            pointBorderColor: '#ffffff',
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (context) => `Balance: ${context.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Balance',
            },
            beginAtZero: false,
          },
        },
      },
    });
  }
}
