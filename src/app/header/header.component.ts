import { Component } from '@angular/core';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private toaster: ToastrService,
    private route: Router,
    public dialog: MatDialog,
  ) { }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, action: string): void {
    const dialogRef = this.dialog.open(ConfirmationModelComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { action },
    });

    dialogRef.componentInstance.alert.subscribe(() => {
      if (action === 'logout') {
        this.logout();
      }
    });
  }
  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
