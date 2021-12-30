import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import {TokenService} from '../../service/tokenService';
import {AuthService} from '../../service/authService';
import {Router} from '@angular/router';
import {GastosService} from '../../service/gastosService';
import {Gastos} from '../../models/gastos';
import {SumGastosDto} from '../../models/SumGastosDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  gastos: SumGastosDto[] = [];
  gastosMonth: SumGastosDto[] = [];
  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router, private gastosService: GastosService) {}
  ngOnInit() {
    this.cargarGastos();
    this.cargarGastosmonth();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    // tslint:disable-next-line:prefer-const
    let chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    // tslint:disable-next-line:prefer-const
    let ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    // tslint:disable-next-line:prefer-const
    let chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line', options: chartExample1.options, data: chartExample1.data});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  cargarGastos(): void {
    this.gastosService.listaSumYear().subscribe(
      data => {
        console.log(data);
        data.forEach(obj => {
          this.gastos.push(new SumGastosDto(obj[0], obj[1], obj[2]));
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  cargarGastosmonth(): void {
    this.gastosService.listaSumMonth().subscribe(
      data => {
        console.log(data);
        data.forEach(obj => {
          this.gastosMonth.push(new SumGastosDto(obj[0], obj[1], obj[2]));
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
