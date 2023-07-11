import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeChildGuard } from 'src/app/guards/home-child-guard';
import { PolizaComponent } from '../poliza/poliza.component';
import { ConsultasComponent } from '../consultas/consultas.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivateChild: [HomeChildGuard],
		children: [
			{
				path: 'polizas',
				component: PolizaComponent,
				loadChildren: () => import('../poliza/poliza.module').then((m) => m.PolizaModule)
			},
			{
				path: 'consultas',
				component: ConsultasComponent,
				loadChildren: () => import('../consultas/consultas.module').then((m) => m.ConsultasModule)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
