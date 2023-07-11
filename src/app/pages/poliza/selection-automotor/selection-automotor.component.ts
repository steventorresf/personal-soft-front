import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PAGINATOR } from 'src/app/utilities/parameters';

@Component({
  selector: 'app-selection-automotor',
  templateUrl: './selection-automotor.component.html',
  styleUrls: ['./selection-automotor.component.scss']
})
export class SelectionAutomotorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rowSel: any;
  displayedColumns = ['placa', 'modelo']
  opPag = { ...PAGINATOR };
  dataSource = new MatTableDataSource([]);

  constructor(
    private _dialogRef: MatDialogRef<SelectionAutomotorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  clickSelection(element: any) {
    this.rowSel = this.rowSel?.placaAutomotor == element.placaAutomotor ? null : element;
  }

  aceptar() {
    this._dialogRef.close(this.rowSel);
  }

  close() {
    this._dialogRef.close();
  }

}
