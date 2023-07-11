import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class JwtService {

	constructor() {}

	isLoggedIn(): boolean {
		return !this.isExpired() && sessionStorage.getItem('user') !== null;
	}

	getToken(): string | null {
		const tokenUser = sessionStorage.getItem('token');
		if (tokenUser !== null) {
			return tokenUser;
		}
		return null;
	}

	isExpired(): boolean {
		try {
			const tokenUser = sessionStorage.getItem('token');
			if (tokenUser !== null) {
				const decoded = jwt_decode<any>(tokenUser);
				const tokenExpired = Date.now() > decoded.exp! * 1000;
				return tokenExpired;
			}
			return true;
		} catch (error) {
			console.error('Hubo un error al intentar validar el token:\n', error);
			return true;
		}
	}
}