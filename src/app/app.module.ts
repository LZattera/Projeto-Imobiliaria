import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgPopupsModule } from 'ng-popups';
import { registerLocaleData} from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import ptBR from '@angular/common/locales/pt';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

registerLocaleData(ptBR);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    NgSelectModule, 
    FormsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    IonicModule.forRoot({
      mode: 'ios',
      backButtonText: 'Voltar',
    }),
    // NgChartsModule
    //NgPopupsModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    // { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
