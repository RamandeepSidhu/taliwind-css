import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/users.service';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

initTE({ Modal, Ripple })
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent {
  public rows: any;
  public id: String = '';
  public title: String = 'Country';
  public isOpen = false;
  public form!: FormGroup;
  data: any[] = [];
  public isLoading = false;
  public submitted = false;
  @Output() manageRecords = new EventEmitter<void>();
  constructor(
    private userServices: UserService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
     ) {}
  ngOnInit(): void {
    this.getData(this.title);
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });

  }

  tabClick(tab: string) {
    this.title = tab;
    this.getData(tab);
  }
  @Output() dataUpdated = new EventEmitter<any>();

  getData(params = this.title) {
    this.isLoading = true;
    try {
      this.userServices.getManageUser(params).subscribe((response: any) => {
        if (response.status === true) {
          this.isLoading = false;
            this.isLoading = false;
            this.data = response.data;
            this.dataUpdated.emit(this.data);

        }
      });
    } catch (error) {
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    (window as any).viewData = this.viewData.bind(this);
  }

  viewData(index: any) {
    const item = this.data[index];
    this.id = item._id;
    this.form.get('title')?.patchValue(item.title);
    this.isOpen = true;
  }
  

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    const payload = this.form.value;
    if (!this.form.valid) {
      this.toaster.warning('The title field is required', 'Warning');
      return;
    }
    const type: String = this.title;
    this.userServices
      .storeAndUpdateManageUser(payload, type, this.id)
      .subscribe((response: any) => {
        this.isLoading = false;
        if (response.status === true) {
          this.submitted = false;
          this.id = '';
          this.toaster.success(response.message, 'Success');
          this.form.reset();
          this.isOpen=false;
          this.getData(this.title);
        } else {
          this.toaster.error(response.message, 'Error');
        }
      });
  }

  manageDelete(index: any) {
    const id = this.data[index]._id;
    this.isLoading = true;
    this.userServices
      .deleteManageUser(this.title, id)
      .subscribe((response: any) => {
        if (response.status === true) {
          this.toaster.success(response.message, 'Success');
          this.data.splice(index, 1);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.toaster.error(response.message, 'Error');
        }
      });
  }

  openDialog(id:number,action: string): void {
    const dialogRef = this.dialog.open(ConfirmationModelComponent, {
      width: '450px',
      data: { action},
    });

    dialogRef.componentInstance.alert.subscribe(() => {
     if (action === 'manageRecords') {
      this.isOpen=false;
      this.manageDelete(id);
      }
    });
  }

  closeModal() {
    this.isOpen=false;
  }
  openModel(){
    this.isOpen=true
  }
}
