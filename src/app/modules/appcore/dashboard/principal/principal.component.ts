import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import Chart from 'chart.js/auto';
import { MonitoramentoService } from '../../monitoramento/monitoramento.service';
import { CadastrosService } from '../../cadastros/cadastros.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;
  

  error: string;
  datas: string[] = [];
  variaveis: string[] = [];
  valores: number[] = [];
  lstSeriesChart :  any[] = []
  lstSetores :  any[] = []

  constructor(
    private monitoramentoService: MonitoramentoService,
    private cadastrosService: CadastrosService,
  ) { }
  
  ngOnInit(): void {
    this.loadSetores();
    this.loadMonitoramento(null);
  }
  
  ngAfterViewInit(): void {
    this.lineChartMethod();
  }
  loadSetores(){
  
     this.cadastrosService.listaAtivoSetor().subscribe((res)=>{
      console.log('SETORES => ',res)
      this.lstSetores = res;
    }, err =>{
      this.error = err;
     });
  }

  loadMonitoramento(setor){
    console.log("SETOR" , setor)
    this.datas = [];
    this.lstSeriesChart = [];
    this.monitoramentoService.dashboard(1, setor).subscribe((res)=>{
      this.datas = res.points;


      res.series.forEach(ser => {
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
        
         this.lineChartMethod();
      // });
    }, err =>{
      this.error = err;
    });  
  }
  
  
  lineChartMethod() {
    console.log("Grafico")
   
    if(this.lineChart!=null){
      this.lineChart.destroy();
    }
    
  //   this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
  //     type: 'line',
  //     data: {
  //       labels: this.datas,
  //       datasets: this.lstSeriesChart,
  //     },
  //   });
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