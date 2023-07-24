import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { MonitoramentoService } from '../../monitoramento/monitoramento.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  labels : any = [1,2,3,4,5];
  data :any = {
    labels: this.labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  config : any = {
    type: 'line',
    data: this.data,
  };

  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;
  

  error: string;
  datas: string[] = [];
  variaveis: string[] = [];
  valores: number[] = [];
  lstSeriesChart :  any[] = []

  constructor(
    private monitoramentoService: MonitoramentoService
  ) { }
  
  ngOnInit(): void {
    this.loadMonitoramento();
  }
  
  ngAfterViewInit(): void {
    // this.lineChartMethod();
  }
  
  loadMonitoramento(){
    console.log("Monitoramento")
    this.monitoramentoService.dashboard(1).subscribe((res)=>{
      this.datas = res.points;

      res.series.forEach(ser => {
        // var mSerie : ChartItem;
        // mSerie.label = ser.nomeSerie;
        // mSerie.data = ser.Valores;
          var teste : any;
          teste = {
            label: ser.nomeSerie,
              fill: false,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: ser.valores,
              spanGaps: false,
          }
        this.lstSeriesChart.push(teste);
      });

      // this.valores = res.valor;
      // this.variaveis = res.nomeVariavel;
      // console.log(this.variaveis)
      // res.nomeVariavel.forEach(row => {
        
         this.lineChartMethod();
      // });
    }, err =>{
      this.error = err;
    });  
  }
  
  
  lineChartMethod() {
    console.log("Grafico")

    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.datas,
        datasets: this.lstSeriesChart,
      },
    });
  }
}


export interface ChartItem{
    label: [],
    fill: false,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [],
    spanGaps: false,
  
}