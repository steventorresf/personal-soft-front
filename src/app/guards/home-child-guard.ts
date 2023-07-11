import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlSegment } from "@angular/router";
import { SwalService } from "../services/swal.service";
import { JwtService } from "../services/jwt.service";

@Injectable({
	providedIn: 'root'
})
export class HomeChildGuard implements CanActivateChild {
	constructor(
		private _jwtApiService: JwtService,
		private _router: Router,
		private _swalService: SwalService
	) { }

	async canActivateChild(childRoute: ActivatedRouteSnapshot): Promise<boolean> {
		return await this.accesPath(childRoute.url);
	}

	private async accesPath(url: UrlSegment[]): Promise<boolean> {
		if (!this._jwtApiService.isLoggedIn()) {
			await this._swalService.infoError('¡Sesión expirada!', 'Su sesión ha expirado, por favor ingrese nuevamente.', () => {
				void this._router.navigateByUrl('login')
					.then(() => {
						window.location.reload();
					});
			})
			return false;
		}

		const canAccess = true;
		if (!canAccess) {
			await this._swalService.infoError('Sin acceso', 'Usted no tiene acceso a este modulo', () => {
				this._router.navigateByUrl('')
					.then(() => {
						window.location.reload();
					});
			});
		}
		return canAccess;
	}
}
