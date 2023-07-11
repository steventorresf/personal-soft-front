import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionClientComponent } from './selection-client/selection-client.component';
import { SelectionPlanPolizaComponent } from './selection-planpoliza/selection-planpoliza.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PolizaApiService } from 'src/app/services/apis/poliza.service';
import { SwalService } from 'src/app/services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.scss']
})
export class PolizaComponent implements OnInit {

  isSelCliente: boolean = false;
  isSelPoliza: boolean = false;
  myForm: FormGroup = this._fb.group({
    planPolizaId: [null, [Validators.required]],
    planPoliza: [null, [Validators.required]],
    valorMaximo: [null, [Validators.required]],
    clienteId: [null, [Validators.required]],
    identificacion: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    ciudadResidencia: [null, [Validators.required]],
    direccionResidencia: [null, [Validators.required]],
    placaAutomotor: [null, [Validators.required]],
    modeloAutomotor: [null, [Validators.required]],
    tieneInspeccion: [false, [Validators.required]],
    fechaTomaPoliza: [null, [Validators.required]],
    fechaInicioVigencia: [null, [Validators.required]],
    fechaFinVigencia: [null, [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _matDialog: MatDialog,
    private _polizaService: PolizaApiService,
    private _swalService: SwalService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.myForm.disable();
  }

  openSelectionClient() {
    this._matDialog.open(SelectionClientComponent, {
      disableClose: true,
      width: '95%',
      maxHeight: '98vh'
    }).afterClosed().subscribe(data => {
      if (data) {
        const client = data.cliente;
        const automotor = data.automotor;

        this.myForm.patchValue({
          clienteId: client.id,
          identificacion: client.identificacion,
          nombre: client.nombre,
          fechaNacimiento: new Date(moment(client.fechaNacimiento).format('MM-DD-YYYY')),
          ciudadResidencia: client.ciudadResidencia,
          direccionResidencia: client.direccionResidencia,
          placaAutomotor: automotor.placaAutomotor,
          modeloAutomotor: automotor.modeloAutomotor,
        });

        this.myForm.get('nombre')?.enable();
        this.myForm.get('fechaNacimiento')?.enable();
        this.myForm.get('ciudadResidencia')?.enable();
        this.myForm.get('direccionResidencia')?.enable();
        this.myForm.get('tieneInspeccion')?.enable();

        this.isSelCliente = true;
      }
    });
  }

  openSelectionPlanPoliza() {
    this._matDialog.open(SelectionPlanPolizaComponent, {
      disableClose: true,
      width: '60%',
      maxHeight: '98vh'
    }).afterClosed().subscribe(data => {
      if (data) {
        this.myForm.patchValue({
          planPolizaId: data.id,
          planPoliza: data.nombrePlan,
          valorMaximo: data.valorMaximo
        });

        this.myForm.get('fechaTomaPoliza')?.enable();
        this.myForm.get('fechaInicioVigencia')?.enable();
        this.myForm.get('fechaFinVigencia')?.enable();

        this.isSelPoliza = true;
      }
    });
  }

  submitConfirmation() {
    this._swalService.alertQuestion('¡Confirmación!', '¿Desea radicar esta póliza?.', () => {
      this.submitConfirmated();
    });
  }

  submitConfirmated() {
    const payload = {
      planPolizaId: this.myForm.get('planPolizaId')?.value,
      cliente: {
        id: this.myForm.get('clienteId')?.value,
        identificacion: this.myForm.get('identificacion')?.value,
        nombre: this.myForm.get('nombre')?.value,
        fechaNacimiento: this.myForm.get('fechaNacimiento')?.value,
        ciudadResidencia: this.myForm.get('ciudadResidencia')?.value,
        direccionResidencia: this.myForm.get('direccionResidencia')?.value,
      },
      placaAutomotor: this.myForm.get('placaAutomotor')?.value,
      tieneInspeccion: this.myForm.get('tieneInspeccion')?.value,
      fechaTomaPoliza: this.myForm.get('fechaTomaPoliza')?.value,
      fechaInicioVigencia: this.myForm.get('fechaInicioVigencia')?.value,
      fechaFinVigencia: this.myForm.get('fechaFinVigencia')?.value,
    };

    this._polizaService.postPolizas(payload).subscribe(res => {
      if(res.success) {
        this._swalService.infoSuccess('Proceso exitoso', res.message, () => {
          this._router.navigateByUrl('/consultas');
        });
      }
    });
  }

}
