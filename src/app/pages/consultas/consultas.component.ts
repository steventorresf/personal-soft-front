import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PolizaApiService } from 'src/app/services/apis/poliza.service';
import { PAGINATOR } from 'src/app/utilities/parameters';
import { ConsultaDetalleComponent } from './consulta-detalle/consulta-detalle.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['noPoliza', 'identificacion', 'nombre', 'placa', 'modelo'];
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);
  filters: any = { placa: '', poliza: '' };
  myForm: FormGroup = this._fb.group({
    noPoliza: [null],
    placaAutomotor: [null]
  });

  constructor(
    private _fb: FormBuilder,
    private _polizaService: PolizaApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  filtrar() {
    this.filters.placa = this.myForm.get('placaAutomotor')?.value || '';
    this.filters.poliza = this.myForm.get('noPoliza')?.value || '';
    this.paginator.firstPage();
    this.getDataSource();
  }

  getDataSource() {
    const payload = {
      pageIndex: (this.paginator?.pageIndex || this.opPag.pageIndex) + 1,
      pageSize: this.paginator?.pageSize || this.opPag.pageSize,
      ...this.filters
    };

    this._polizaService.getByFilters(payload).subscribe(res => {
      this.opPag.totalItems = res.data.countItems;
      this.paginator.length = res.data.countItems;

      this.dataSource = new MatTableDataSource(res.data.listItems);
    });
  }

  verDetalle(element: any) {
    this._dialog.open(ConsultaDetalleComponent, {
      disableClose: true, width: '60%', maxHeight: '98vh', data: { ...element }
    });
  }

  sortData(sortData: Sort) {
    if (sortData.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortData.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  limpiar() {
    this.myForm.reset();
    this.dataSource = new MatTableDataSource([]);
  }

}
