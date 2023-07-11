import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styleUrls: ['./consulta-detalle.component.scss']
})
export class ConsultaDetalleComponent implements OnInit {

  formData: any = {};
  constructor(
    private _dialogRef: MatDialogRef<ConsultaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formData = { ...this.data };
  }

  close() {
    this._dialogRef.close();
  }

}
