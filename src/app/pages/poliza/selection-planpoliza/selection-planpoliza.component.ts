import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PAGINATOR } from 'src/app/utilities/parameters';
import { PlanPolizaApiService } from 'src/app/services/apis/planPoliza.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-selection-planpoliza',
  templateUrl: './selection-planpoliza.component.html',
  styleUrls: ['./selection-planpoliza.component.scss']
})
export class SelectionPlanPolizaComponent implements OnInit {

  rowSel: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['planPoliza', 'valorMaximo']
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);
  filters: any = { nombrePlanPoliza: '', valorMaximo: -1 };

  myForm: FormGroup = this._formBuilder.group({
    nombrePlanPoliza: [null],
    valorMaximo: [null, [Validators.pattern('[0-9]')]]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<SelectionPlanPolizaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _liveAnnouncer: LiveAnnouncer,
    private _planPolizaApiService: PlanPolizaApiService
  ) { }

  ngOnInit() {
    this.getDataSource();
  }

  filtrar() {
    this.filters.nombrePlan = this.myForm.get('nombrePlanPoliza')?.value ?? '';
    this.filters.valorMaximo = this.myForm.get('valorMaximo')?.value ?? -1;
    this.paginator.firstPage();
    this.getDataSource();
  }

  getDataSource() {
    const params = {
      pageIndex: (this.paginator?.pageIndex || this.opPag.pageIndex) + 1,
      pageSize: this.paginator?.pageSize || this.opPag.pageSize,
      ...this.filters
    }
    this._planPolizaApiService.getByFilters(params).subscribe(res => {
      this.opPag.totalItems = res.data.countItems;
      this.paginator.length = res.data.countItems;

      this.dataSource = new MatTableDataSource(res.data.listItems);
    })
  }

  sortData(sortData: Sort) {
    if (sortData.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortData.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }

  limpiar() {
    this.filters = { identificacion: '', nombre: '' };
    this.getDataSource();
  }

  clickSelection(element: any) {
    this.rowSel = this.rowSel?.id == element.id ? null : element;
  }

  aceptar() {
    this._dialogRef.close(this.rowSel);
  }

  close() {
    this._dialogRef.close();
  }

}
