import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	],
	exports: []
})
export class LoginPageModule {}
