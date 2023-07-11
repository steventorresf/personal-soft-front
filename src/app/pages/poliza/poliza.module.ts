import { NgModule } from '@angular/core';
import { PolizaComponent } from './poliza.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectionClientComponent } from './selection-client/selection-client.component';
import { SelectionPlanPolizaComponent } from './selection-planpoliza/selection-planpoliza.component';
import { SelectionAutomotorComponent } from './selection-automotor/selection-automotor.component';

@NgModule({
	declarations: [
		PolizaComponent,
		SelectionClientComponent,
		SelectionAutomotorComponent,
		SelectionPlanPolizaComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class PolizaModule { }
