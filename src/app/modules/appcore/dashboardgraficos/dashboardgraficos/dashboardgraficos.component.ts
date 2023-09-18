import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardgraficosService } from 'src/app/modules/appcore/dashboardgraficos/dashboardgraficos.service';
import { CadastrosService } from '../../cadastros/cadastros.service';
import { MonitoramentoService } from '../../monitoramento/monitoramento.service';
import { AppService } from 'src/app/core/services/app.service';
import { Observable } from 'rxjs';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import * as Chart from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#8897AA25';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

@Component({
  selector: 'app-dashboardgraficos',
  templateUrl: './dashboardgraficos.component.html',
  styleUrls: ['./dashboardgraficos.component.scss']
})
export class DashboardgraficosComponent implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [plugin];

  // public barChartData: ChartData<'bar'> = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   ],
  // };

  lineChart: any = null;
  loading: boolean;

  idCliente: any;
  variaveis: string[] = [];
  valores: number[] = [];
  lstSeriesChart :  any[] = []
  lstSetores :  any[] = []

  constructor(
    private monitoramentoService: MonitoramentoService,
    private cadastrosService: CadastrosService,
    private appService : AppService,
    ) { }
  
  ngOnInit(): void {
    this.idCliente = this.appService.getCliente();

    this.Refresh();
  }

  Refresh(){
    this.loading = true;
    this.loadSetores().then(() => {
      this.loadMonitoramento(null).then(() => {
        this.loading = false;
        this.lineChartMethod();
      });
    });
  }

  loadSetores() : Promise<void>{
    return new Promise((resolve)=>{
      this.cadastrosService.listaAtivoSetor().subscribe({
        next: (res) => { 
          // console.log('SETORES => ',res)
          this.lstSetores = res;
          resolve(); 
        },
        error:(err) => { resolve(); }
      });
    });
  }

  setores: any[] = [];

  loadMonitoramento(setor): Promise<void>{
    return new Promise ((resolve)=>{
      this.monitoramentoService.dashboardgraficos(this.idCliente, setor).subscribe({
        next: (res)=>{ console.log("Monitoramento: ", res) ;this.setores = res; resolve(); },
        error:(err) => { resolve(); }
      });
    });
  }

//===========================================================================================================================
  lineChartMethod() {
    let qtd : number = 0;

    this.setores.forEach(row=>{
      console.log("Linha 1 Monitoramente=> ", row.nome);
      row.variaveis.forEach(vari=>{
        console.log("Variavel=> ", vari.nomeVariavel);
        vari.valores.forEach(val => {
          console.log(val);
          val.data;
          val.valor;
        });
      })
    });

    //tentar pegar um primerio depois tentar dentre do do for

    const interval = setInterval(() => {
      const element = document.getElementById("canva-0-0") as HTMLCanvasElement;
      if(qtd < 3 && element){
        this.createChart(element);
        clearInterval(interval);
      } 
      if(qtd >= 3) {
        clearInterval(interval);
      }
      
      qtd++;
    }, 100);
  }

  createChart(chart: HTMLCanvasElement){

    if(this.lineChart != null){
      this.lineChart.destroy();
    }


     new Chart(chart, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//datas dda variavel
        datasets: [{
          label: '# of Votes',//nome da variavel
          data: [12, 19, 3, 5, 2, 3],//valores da variavel
          borderWidth: 1
        }]
      },
    });
  }
}

export interface MeuObjeto {
  propriedade1: string;
  propriedade2: number;
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
