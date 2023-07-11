import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteApiService } from 'src/app/services/apis/cliente.service';
import { PAGINATOR } from 'src/app/utilities/parameters';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as moment from 'moment';
import { SelectionAutomotorComponent } from '../selection-automotor/selection-automotor.component';

const genders = ['M', 'F'];
const namesM = ['Steven', 'Luis', 'Pedro', 'Pablo', 'Manuel', 'Juan', 'Ricardo', 'Jose', 'Alberto', 'Ever', 'Andres', 'Camilo', 'Cristian', 'Gonzalo', 'Gabriel', 'Yeison', 'Rodrigo', 'Alvaro', 'David', 'Jaime', 'Sebastian', 'Alejandro', 'Gustavo']
const namesF = ['Ana', 'Isabel', 'Valeria', 'Veronica', 'Martha', 'Linda', 'Katerin', 'Paola', 'Karen', 'Carolina', 'Camila', 'Laura', 'Claudia', 'Milena', 'Margarita', 'Johana', 'Stefany', 'Maria', 'Andrea', 'Valentina', 'Daniela', 'Natalia', 'Mariana']
const lastNames = ['Perez', 'Gutierrez', 'Manrique', 'Torres', 'Castro', 'Rodriguez', 'Aguilar', 'Fernandez', 'Pino', 'Camargo', 'Estrada', 'Jaramillo', 'Pertuz', 'Cajamarca', 'Pedraza', 'Ramirez', 'Toro', 'Murillo', 'Bolivar', 'Morata', 'Casillas', 'Terraza', 'Martinez', 'Contreras', 'Angulo', 'Quintero', 'Hernandez', 'Caceres', 'Padilla', 'Gomez', 'Ortiz', 'Zuluaga'];
const numbersCon0 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numbersSin0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const fechaInicio = moment().add('years', -59);
const totalDias = moment().add('years', -19).diff(fechaInicio, 'days') + 1;
const cities = ['Bogotá', 'Barranquilla', 'Medellín', 'Cali', 'Bucaramanga', 'Cucuta', 'Valledupar', 'Monteria', 'Cartagena', 'Popayan', 'Rio Negro', 'Chia', 'Santa Marta'];
const directions = ['Calle', 'Carrera', 'Avenida'];
const models = ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];

@Component({
  selector: 'app-selection-client',
  templateUrl: './selection-client.component.html',
  styleUrls: ['./selection-client.component.scss']
})
export class SelectionClientComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rowSel: any;
  displayedColumns = ['identificacion', 'nombre', 'ciudad', 'direccion', 'placas']
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);
  filters: any = { identificacion: '', nombre: '' };

  myForm: FormGroup = this._formBuilder.group({
    identificacion: [null],
    nombre: [null]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<SelectionClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _liveAnnouncer: LiveAnnouncer,
    private _clienteApiService: ClienteApiService
  ) { }

  ngOnInit() {
    this.getDataSource();
  }

  filtrar() {
    this.filters.identificacion = this.myForm.get('identificacion')?.value ?? ''
    this.filters.nombre = this.myForm.get('nombre')?.value ?? '';
    this.paginator.firstPage();
    this.getDataSource();
  }

  getDataSource() {
    const params = {
      pageIndex: (this.paginator?.pageIndex || this.opPag.pageIndex) + 1,
      pageSize: this.paginator?.pageSize || this.opPag.pageSize,
      ...this.filters
    }
    this._clienteApiService.getClientesByFilters(params).subscribe(res => {
      this.opPag.totalItems = res.data.countItems;
      this.paginator.length = res.data.countItems;

      res.data?.listItems?.map((item: any) => {
        item.fechaNacimiento = moment(item.fechaNacimiento).format('YYYY-MM-DD');
        item.placas = '';
        item.automotors.forEach((element: any) => {
          item.placas += ' - (' + element.placaAutomotor + '/' + element.modeloAutomotor + ')';
        });
        item.placas = item.placas.substring(3);
        return item;
      })

      this.dataSource = new MatTableDataSource(res.data.listItems);
    })
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  loadClientes() {
    const payload: any[] = [];
    for (let i = 0; i < 5; i++) {
      let name = lastNames[this.getRandomInt(lastNames.length)] + ' ' + lastNames[this.getRandomInt(lastNames.length)] + ' ' + (this.paginator.length + 1).toString() + (i + 1).toString();
      let codGender = genders[this.getRandomInt(genders.length)];
      if (codGender == 'M') {
        name = namesM[this.getRandomInt(namesM.length)] + ' ' + namesM[this.getRandomInt(namesM.length)] + ' ' + name;
      } else if (codGender == 'F') {
        name = namesF[this.getRandomInt(namesF.length)] + ' ' + namesF[this.getRandomInt(namesF.length)] + ' ' + name;
      }

      let identificacion = numbersSin0[this.getRandomInt(numbersSin0.length)];
      while (identificacion.length < 10) {
        identificacion += numbersCon0[this.getRandomInt(numbersCon0.length)];
      }

      const automotors = [];
      let indexAuto = this.getRandomInt(5);
      for (let i = 0; i <= indexAuto; i++) {
        automotors.push({
          placaAutomotor: letters[this.getRandomInt(letters.length)] + letters[this.getRandomInt(letters.length)] + letters[this.getRandomInt(letters.length)] + numbersCon0[this.getRandomInt(numbersCon0.length)] + numbersCon0[this.getRandomInt(numbersCon0.length)] + numbersCon0[this.getRandomInt(numbersCon0.length)],
          modeloAutomotor: models[this.getRandomInt(models.length)]
        });
      }

      let fechaInicioTemp = moment(fechaInicio);
      payload.push({
        nombre: name,
        identificacion: identificacion,
        fechaNacimiento: moment(fechaInicioTemp.add('days', this.getRandomInt(totalDias))).format('YYYY-MM-DD'),
        ciudadResidencia: cities[this.getRandomInt(cities.length)],
        direccionResidencia: directions[this.getRandomInt(directions.length)] + ' ' + numbersSin0[this.getRandomInt(numbersSin0.length)] + numbersCon0[this.getRandomInt(numbersCon0.length)],
        automotors: automotors
      })
    }

    this._clienteApiService.postClientes(payload).subscribe(res => {
      if (!res.data)
        return;

      this.getDataSource();
    })
  }

  sortData(sortData: Sort) {
    if (sortData.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortData.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  clientSelection(element: any) {
    this.rowSel = this.rowSel?.id == element.id ? null : element;
  }

  limpiar() {
    this.paginator.firstPage();
    this.myForm.reset();
    this.filters = { identificacion: '', nombre: '' };
    this.getDataSource();
  }

  aceptar() {
    this._dialog.open(SelectionAutomotorComponent, {
      disableClose: true,
      width: '40%',
      maxHeight: '98vh',
      data: [...this.rowSel.automotors]
    }).afterClosed().subscribe(data => {
      if (data) {
        this._dialogRef.close({ cliente: this.rowSel, automotor: data });
      }
    });
  }

  close() {
    this._dialogRef.close();
  }

}
