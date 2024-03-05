import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from '../core/enums/role.enum';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageComponent } from '../manage/manage.component';

export interface PeriodicElement {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  plateform: string;
  lead_score: string;
  country: string;
}

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('400ms ease-in', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    animate('400ms ease-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatSelect) userColumnSelect!: MatSelect;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  paginatorList!: HTMLCollectionOf<Element>;
  idx!: number;
  dataSource: any = new MatTableDataSource<any>();
  isLoading = true;
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  users:any[]= [];
  public usersTableColumn: any = [];
  public countries: any = [];
  public leadScores: any = [];
  public plateforms: any = [];
  public conversions: any = [];
  public pageSizeOptions: any = [];
  public submitted = false;
  public pageSize: number = 10;
  selection = new SelectionModel<PeriodicElement>(true, []);
  toppings = new FormControl();
  selectedColumns: any[] = [];
  searchValue: string = '';
  displayedColumnsName: string[] = [
    'action',
    'name',
    'email',
    'phone',
    'linkedin',
    'job_url',
    'plateform',
    'lead_score',
    'country',
    'conversion',
    'date_time'
  ];
  displayedColumns: string[] = [];
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private userServices: UserService,
    private toaster: ToastrService,
    private route: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getManageData();
    this.getUsers();
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    this.formload();
    this.fetchColumnField();
  }

  formload() {
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        this.users.map((val: any) =>
          this.fb.group({
            email: new FormControl({
              value: val.email,
              disabled: true,
            }, [
              Validators.required,
              Validators.email,
            ]),
            plateform: new FormControl({
              value: val.plateform,
              disabled: true,
            }),
            conversion: new FormControl({
              value: val.conversion,
              disabled: true,
            }),
            lead_score: new FormControl({
              value: val.lead_score,
              disabled: true,
            }),
            country: new FormControl({ value: val.country, disabled: true }),
            linkedin: new FormControl(val.linkedin, [
              Validators.pattern('https?://(www\.)?linkedin\.com/.+'),
            ]),
            name: new FormControl(val.name, [Validators.required]),
            phone: new FormControl(val.phone),
            time: new FormControl({
              value: val.time,
              disabled: true,
            }),
            date: new FormControl({
              value: val.date,
              disabled: true,
            }),
            job_url: new FormControl(val.job_url),
            id: new FormControl(val._id),
            action: new FormControl('existingRecord'),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter: any) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
  }

  getUsers(params?: any) {
    this.isLoading = true;
    try {
      this.userServices.getUsers(params).subscribe((response: any) => {
        if (response.status === true) {
          this.users = response.data;
          this.dataSource = this.users;  
          this.isLoading = false;
          this.formload();
          this.updateIndex();
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName(
      'mat-paginator-range-label'
    );

    this.onPaginateChange(this.paginator, this.paginatorList);

    this.paginator.page.subscribe(() => {
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.updateIndex();
    this.selection.clear();
  }

  AddNewRow() {
    const data = this.VOForm.get('VORows')?.value.filter(
      (e: any) => e.isNewRow
    );
    if (data.length !== 0) {
      this.toaster.error('Please fill the first row', 'Error');
      return;
    }
    this.submitted = false;
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource.paginator = this.paginator;
    this.updateIndex();
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement: any, i: any) {
    const formdata = VOFormElement.get('VORows').at(i);
    formdata.get('isEditable').patchValue(false);
    formdata.controls['country'].enable();
    formdata.controls['plateform'].enable();
    formdata.controls['lead_score'].enable();
    formdata.controls['conversion'].enable();
    formdata.controls['time'].enable();
    formdata.controls['date'].enable();
  }

  updateClient(VOFormElement: any, i: any) {
    const formData = VOFormElement.get('VORows').at(i);
    this.submitted = true;
    if (!formData.valid) {
      this.toaster.error('Please fill the required field', 'Error');
      return;
    }
    const formValue = formData.value;
    if (formValue.date) {
      if (!formValue.time) {
        this.toaster.error('Please select the time', 'Error');
        return;
      }
    }
    if (formValue.time) {
      if (!formValue.date) {
        this.toaster.error('Please select the date', 'Error');
        return;
      }
    }
    formData.get('isEditable').patchValue(true);
    this.formDisable(formData);
    this.isLoading = true;
    const payload = Object.keys(formValue)
      .filter((key) => formValue[key] !== '' && formValue[key] !== null)
      .reduce((obj: any, key) => {
        obj[key] = formValue[key];
        return obj;
      }, {});
    this.userServices
      .userUpdate(formData.value.id, payload)
      .subscribe((response: any) => {
        this.isLoading = false;
        this.submitted = false;
        if (response.status === true) {
          this.toaster.success(response.message, 'Success');
          this.getUsers();
        } else {
          this.toaster.error(response.message, 'Error');
        }
      });
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement: any, i: any) {
    const formData = VOFormElement.get('VORows').at(i);
    const user = this.users[i];
    formData.get('isEditable').patchValue(true);
    if (formData.value.isNewRow) {
      const control = this.VOForm.get('VORows') as FormArray;
      control.removeAt(i);
      this.dataSource = new MatTableDataSource(control.controls);
      this.dataSource.paginator = this.paginator;
      this.updateIndex();
    } else {
      formData.get('country').patchValue(user.country);
      formData.get('plateform').patchValue(user.plateform);
      formData.get('lead_score').patchValue(user.lead_score);
      formData.get('name').patchValue(user.name);
      formData.get('email').patchValue(user.email);
      formData.get('phone').patchValue(user.phone);
      formData.get('linkedin').patchValue(user.linkedin);
      formData.get('date').patchValue(user.date);
      formData.get('time').patchValue(user.time);
      formData.get('job_url').patchValue(user.job_url);
      formData.get('conversion').patchValue(user.conversion);
    }
    this.formDisable(formData);
  }

  onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
    setTimeout(
      (idx: any) => {
        let from = paginator.pageSize * paginator.pageIndex + 1;

        let to =
          paginator.length < paginator.pageSize * (paginator.pageIndex + 1)
            ? paginator.length
            : paginator.pageSize * (paginator.pageIndex + 1);

        let toFrom = paginator.length == 0 ? 0 : `${from} - ${to}`;
        let pageNumber =
          paginator.length == 0
            ? `0 of 0`
            : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
        let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

        if (list.length >= 1) list[0].innerHTML = rows;
      },
      0,
      paginator.pageIndex
    );
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      linkedin: new FormControl('', [
        Validators.pattern('^https://www.linkedin.com/.*$'),
      ]),
      country: new FormControl(''),
      plateform: new FormControl(''),
      lead_score: new FormControl(''),
      conversion: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      job_url: new FormControl(''),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
      id: new FormControl(''),
    });
  }

  getManageData() {
    try {
      this.userServices.getManageUser('country').subscribe((response: any) => {
        if (response.status === true) {
          this.countries = response.data;
        }
      });
      this.userServices
        .getManageUser('leadscore')
        .subscribe((response: any) => {
          if (response.status === true) {
            this.leadScores = response.data;
          }
        });
      this.userServices.getManageUser('platform').subscribe((response: any) => {
        if (response.status === true) {
          this.plateforms = response.data;
        }
      });
      this.userServices.getManageUser('conversion').subscribe((response: any) => {
        if (response.status === true) {
          this.conversions = response.data;
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  addNewRecord(VOFormElement: any, i: any) {
    const formData = VOFormElement.get('VORows').at(i);
    this.submitted = true;
    if (!formData.valid) {
      this.toaster.error('Please fill the required field', 'Error');
      return;
    }
    const formValue = formData.value;
    if (formValue.date) {
      if (!formValue.time) {
        this.toaster.error('Please select the time', 'Error');
        return;
      }
    }
    if (formValue.time) {
      if (!formValue.date) {
        this.toaster.error('Please select the date', 'Error');
        return;
      }
    }
    this.isLoading = true;
    const payload = Object.keys(formValue)
      .filter((key) => formValue[key] !== '' && formValue[key] !== null)
      .reduce((obj: any, key) => {
        obj[key] = formValue[key];
        return obj;
      }, {});
    this.userServices.usersCreate(payload).subscribe((response: any) => {
      this.isLoading = false;
      this.submitted = false;
      if (response.status === true) {
        this.toaster.success(response.message, 'Success');
        this.getUsers();
      } else {
        this.toaster.error(response.message, 'Error');
      }
    });
  }

  errorMeessage(VOFormElement: any, i: any, item: string, error: string) {
    return (
      this.submitted &&
      VOFormElement.get('VORows').at(i).get(item)?.errors &&
      VOFormElement.get('VORows').at(i).get(item)?.errors[error]
    );
  }

  deleteUser(VOFormElement: any, i: any) {
    const formData = VOFormElement.get('VORows').at(i).value;
    this.isLoading = true;
    this.userServices.removeUser(formData.id).subscribe((response: any) => {
      this.isLoading = false;
      if (response.status === true) {
        this.toaster.success(response.message, 'Success');
        this.users.splice(i, 1);
        this.formload();
        this.updateIndex();
      } else {
        this.toaster.error(response.message, 'Error');
      }
    });
  }

  formDisable(formData: any) {
    formData.controls['country'].disable();
    formData.controls['plateform'].disable();
    formData.controls['lead_score'].disable();
  }

  updateIndex(): void {
    this.dataSource.data.forEach((item: any, index: number) => {
      item.index = index;
    });
    this.calculatePageSizeOptions();
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  calculatePageSizeOptions() {
    this.pageSizeOptions = [];
    let dataLength = this.dataSource.filteredData.length;
    const base = 2;
    let option = this.pageSize;
    while (option < dataLength) {
      this.pageSizeOptions.push(option);
      option *= base;
    }
    this.pageSizeOptions.push(dataLength);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.filteredData);
  }

  multipleRecordDelete() {
    const ids = this.selection.selected.map((e: any) => e.value.id);
    this.isLoading = true;
    try {
      this.userServices.multipleUsersDelete({ ids: ids }).subscribe((response: any) => {
        this.isLoading = false;
        if (response.status === true) {
          this.toaster.success(response.message, 'Success');
          this.getUsers();
          this.selection.clear();
          this.searchValue = '';
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  disabledColumnField() {
    if (this.selectedColumns && this.selectedColumns.length !== 0) {
      this.updateColumnField({ fields: this.selectedColumns })
    } else {
      this.userColumnSelect.close();
    }
  }

  fetchColumnField() {
    try {
      this.userServices.getUserTableColumn().subscribe((response: any) => {
        if (response.status === true) {
          this.usersTableColumn = response.data;
          const columns = this.usersTableColumn.filter((e: any) => e.isVisible === true);
          const displayedColumns = columns.map((e: any) => e.title);
          let difference2 = displayedColumns.filter((item: any) => this.displayedColumnsName.includes(item));
          difference2.unshift('action');
          this.displayedColumns = difference2;
          this.toppings.patchValue(columns);
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  updateColumnField(data: any) {
    try {
      this.isLoading = true;
      this.userServices.updateUserTableColumn(data).subscribe((response: any) => {
        this.isLoading = false;
        if (response.status === true) {
          this.userColumnSelect.close();
          this.fetchColumnField();
          this.selectedColumns = [];
        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, action: string): void {
    const dialogRef = this.dialog.open(ConfirmationModelComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { action, count: this.selection.selected.length },
    });

    dialogRef.componentInstance.alert.subscribe(() => {
      if (action === 'logout') {
        this.logout();
      } else if (action === 'remove') {
        this.multipleRecordDelete();
      }
    });
  }

  onChangeColumn(event: any, column: any) {
    if (event.isUserInput) {
      this.displayedColumnsName.filter((item: any) => {
        if (item === column.title) {
          const index = this.displayedColumns.indexOf(column.title);
          if (index !== -1) {
            this.displayedColumns.splice(index, 1);
          } else {
            this.displayedColumns.push(column.title);            
          }
        }
      });
      const index = this.selectedColumns.indexOf(column);
      if (index !== -1) {
        this.selectedColumns.splice(index, 1);
      } else {
        this.selectedColumns.push(column);
      }
    }
  }

  openManageRecords() {
    const dialogRef = this.dialog.open(ManageComponent, {
      width: '500px',
      height: '953px',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
        top: '0',
      },
      data: { animation: 'slideInAnimation' },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getManageData();
    });
  }
  onClick(event: MouseEvent, url: string | undefined): void {
    if (!url) {
      event.preventDefault();
    }
  }
  isNumber(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  generatePdf(): void {
    const data = this.VOForm.get('VORows')?.value;
  
    // Create a new table with the selected columns and table header
    const filteredTable = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Linkedin</th>
      <th>Date/Time</th>
      <th>Platform</th>
      <th>Lead Score</th>
      <th>Conversion</th>
      <th>Country</th>
    `;
    thead.appendChild(headerRow);
    filteredTable.appendChild(thead);
      const tbody = document.createElement('tbody');
    this.users.forEach((row: any) => {
      const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${row.name !== undefined ? row.name : ''}</td>
        <td>${row.email !== undefined ? row.email : ''}</td>
        <td>${row.phone !== undefined ? row.phone : ''}</td>
        <td>${row.linkedin !== undefined ? row.linkedin : ''}</td>
        <td>${row.date_time !== undefined ? row.date_time : ''}</td>
        <td>${row.plateform !== undefined ? row.plateform : ''}</td>
        <td>${row.lead_score !== undefined ? row.lead_score : ''}</td>
        <td>${row.conversion !== undefined ? row.conversion : ''}</td>
        <td>${row.country !== undefined ? row.country : ''}</td>
      `;
  
      tbody.appendChild(tr);
    });
  
    filteredTable.appendChild(tbody);
    filteredTable.classList.add('your-custom-class');
    const filteredContent = filteredTable.outerHTML;
    this.userServices.generatePdf(filteredContent, 'table_data');
  }
  
  
}
