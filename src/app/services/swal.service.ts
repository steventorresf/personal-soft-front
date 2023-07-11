import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class SwalService {

    constructor() { }

    alertQuestion(title: string, message: string, method: any) {
        return Swal.fire({
            title: title,
            text: message,
            icon: "question",
            showCloseButton: false,
            showCancelButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            focusCancel: true
        }).then(result => {
            if (result.isConfirmed && method) {
                method();
            }
        });
    }

   infoSuccess(title: string, message: string, method: any) {
        return Swal.fire({
            title: title,
            text: message,
            icon: "success",
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false
        }).then(result => {
            if (result.isConfirmed && method) {
                method();
            }
        });
    }

    infoError(title: string, message: string, method: any) {
        return Swal.fire({
            title: title,
            text: message,
            icon: "error",
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false
        }).then(result => {
            if (result.isConfirmed && method) {
                method();
            }
        });
    }
}