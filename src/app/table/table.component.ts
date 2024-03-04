// table.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any[];
  @Input() displayedColumns!: string[];
  @Output() deleteRecord = new EventEmitter<number>();
  @Output() viewData = new EventEmitter<number>();
  @Input() selection: any; 


  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    console.log(this.dataSource[0])
  }

  onViewData(index: number) {
    this.viewData.emit(index);
  }
  
  openDialog(index: number, action: string) {
    const item = this.dataSource[index];
      const dialogRef = this.dialog.open(ConfirmationModelComponent, {
        width: '450px',
        data: { action,item}, 
      });
  
      dialogRef.componentInstance.alert.subscribe(() => {
       if (action === 'manageRecords') {
        this.deleteRecord.emit(index);
        }
      });
  }
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }
  
}
