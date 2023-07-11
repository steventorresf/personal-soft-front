import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultasComponent } from './consultas.component';
import { ConsultaDetalleComponent } from './consulta-detalle/consulta-detalle.component';

@NgModule({
	declarations: [
		ConsultasComponent,
		ConsultaDetalleComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class ConsultasModule { }
