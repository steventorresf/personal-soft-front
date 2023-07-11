import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { PolizaModule } from '../poliza/poliza.module';
import { ConsultasModule } from '../consultas/consultas.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		MaterialModule,
		HomeRoutingModule,
		PolizaModule,
		ConsultasModule
	]
})
export class HomeModule {}
