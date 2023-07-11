import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SwalService } from "../services/swal.service";
import { JwtService } from "../services/jwt.service";

@Injectable({
	providedIn: 'root'
})
export class HomeGuard implements CanActivate {
	constructor(
		private _jwtApiService: JwtService,
		private _router: Router,
		private _swalService: SwalService
	) { }

	async canActivate(): Promise<boolean> {
		return await this.accesPath();
	}

	private async accesPath(): Promise<boolean> {
		if (!this._jwtApiService.isLoggedIn()) {
			await this._swalService.infoError('¡Sesión expirada!', 'Su sesión ha expirado, por favor ingrese nuevamente.', () => {
				void this._router.navigateByUrl('login')
					.then(() => {
						window.location.reload();
					});
			})
			return false;
		}
		return true;
	}
}
