import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DashboardgraficosService } from "src/app/modules/appcore/dashboardgraficos/dashboardgraficos.service";
import { CadastrosService } from "../../cadastros/cadastros.service";
import { MonitoramentoService } from "../../monitoramento/monitoramento.service";
import { AppService } from "src/app/core/services/app.service";
import { Observable } from "rxjs";

import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import * as Chart from "chart.js";
// import { BaseChartDirective, Color } from 'ng2-charts';

const plugin = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#8897AA25";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

@Component({
  selector: "app-dashboardgraficos",
  templateUrl: "./dashboardgraficos.component.html",
  styleUrls: ["./dashboardgraficos.component.scss"],
})
export class DashboardgraficosComponent implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration["options"] = {};
  public barChartType: ChartType = "bar";
  public barChartPlugins = [plugin];

  lineChart: any = null;
  loading: boolean;

  idCliente: any;
  variaveis: string[] = [];
  valores: number[] = [];
  lstSeriesChart: any[] = [];
  lstSetores: any[] = [];

  constructor(
    private monitoramentoService: MonitoramentoService,
    private cadastrosService: CadastrosService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.idCliente =+ this.appService.getCliente();
    console.log(this.idCliente, 'CLIENTE');

    this.Refresh();
  }

  Refresh() {
    this.loading = true;
    this.loadSetores().then(() => {
      this.loadMonitoramento(null).then(() => {
        this.loading = false;
        this.lineChartMethod();
      });
    });
  }

  loadSetores(): Promise<void> {
    return new Promise((resolve) => {
      this.cadastrosService.listaAtivoSetor().subscribe({
        next: (res) => {
          // console.log('SETORES => ',res)
          this.lstSetores = res;
          resolve();
        },
        error: (err) => {
          resolve();
        },
      });
    });
  }

  setores: any[] = [];

  loadMonitoramento(setor): Promise<void> {
    return new Promise((resolve) => {
      this.monitoramentoService
        .dashboardgraficos(this.idCliente, setor)
        .subscribe({
          next: (res) => {
            console.log("Monitoramento: ", res);
            this.setores = res;
            resolve();
          },
          error: (err) => {
            resolve();
          },
        });
    });
  }

  //===========================================================================================================================
  listaMonitoramento: any;
  listaValores: any;
  listavalores: any = [];
  listaDatas: any = [];

  //funciona mais ou menos
  lineChartMethod() {
    // Função para criar o gráfico
    const createChart = (chart: HTMLCanvasElement, listaValores, listaDatas, nomeVariavel) => {
      new Chart(chart, {
        type: "line",
        data: {
          labels: listaDatas,
          datasets: [
            {
              label: nomeVariavel,
              data: listaValores,
              borderWidth: 1,
              borderColor: "rgb(50, 99, 200)",
              backgroundColor: "rgb(0, 0, 100, 0.5)",
              
            },
          ],
        },
      });
    };
  
    // let qtd = 0;
  
    for (let i = 0; i < this.setores.length; i++) {
      const row = this.setores[i];
  
      for (let j = 0; j < row.variaveis.length; j++) {
        const vari = row.variaveis[j];

        this.listaMonitoramento = vari;
  
        let listaValores = [];
        let listaDatas = [];
  
        for (let k = 0; k < vari.valores.length; k++) {
          const val = vari.valores[k];
          listaValores.push(val.valor);
          listaDatas.push(val.data);
        }
  
        const nomeCanva = "canva-" + i + "-" + j;
  
        const interval = setInterval(() => {
          const element = document.getElementById(nomeCanva) as HTMLCanvasElement;
  
          if (element) {
            createChart(element, listaValores, listaDatas, vari.nomeVariavel);
            clearInterval(interval);
          }
  
        }, 100);
      }
    }
  }

  
}

export interface ChartItem {
  label: [];
  fill: true;
  borderColor: "rgb(50, 99, 200)",
  borderCapStyle: "butt";
  borderDash: [];
  borderDashOffset: 0.0;
  borderJoinStyle: "miter";
  pointBorderColor: "rgba(75,192,192,1)";
  pointBackgroundColor: "#fff";
  pointBorderWidth: 1;
  pointHoverRadius: 5;
  pointHoverBackgroundColor: "rgba(75,192,192,1)";
  pointHoverBorderColor: "rgba(220,220,220,1)";
  pointHoverBorderWidth: 2;
  pointRadius: 1;
  pointHitRadius: 10;
  data: [];
  spanGaps: false;
}
