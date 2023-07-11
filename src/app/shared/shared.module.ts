import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { NoItemsComponent } from './components/no-items/no-items.component';

@NgModule({
  declarations: [ LoadingComponent, NoItemsComponent ],
  exports: [ LoadingComponent, NoItemsComponent],
  imports: [ CommonModule ]
})

export class SharedModule { }
