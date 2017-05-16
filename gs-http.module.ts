import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsHttpApiService } from './services/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [GsHttpApiService],
  exports: []
})
class GsHttpModule { }

export { GsHttpModule, GsHttpApiService }