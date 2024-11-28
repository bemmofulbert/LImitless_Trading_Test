import { MatButtonModule } from '@angular/material/button';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import User from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-update',
  imports: [
    ReactiveFormsModule,
    UserComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  user: User = new User();
  userId = -1;
  formBuilder = new FormBuilder();
  formGroup = this.formBuilder.group({
    username: [this.user.username, [Validators.required]],
    photo: [this.user.photo],
  });
  private route = inject(ActivatedRoute);
  private routeSubcription: Subscription | null = null;
  private router = inject(Router);
  private userService = inject(UserService);
  private formValueSubcription: Subscription | null = null;
  private saveSubcription: Subscription | null = null;
  private deleteSubcription: Subscription | null = null;

  private readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.routeSubcription = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.userId = parseInt(params['id']);
            return this.userService.get(this.userId);
          }
          return of(null);
        })
      )
      .subscribe((currentUser) => {
        if (currentUser) {
          this.user = currentUser;
          this.formGroup.patchValue(this.user);
          console.log(currentUser);
        }
      });

    this.formValueSubcription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.user = Object.assign(new User(), data);
        this.user.id = this.userId;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubcription?.unsubscribe();
    this.formValueSubcription?.unsubscribe();
    this.saveSubcription?.unsubscribe();
    this.deleteSubcription?.unsubscribe();
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return !(
      formControl?.invalid &&
      (formControl.dirty || formControl.touched)
    );
  }
  navigateBack() {
    this.router.navigate(['/user']);
  }
  deleteUser() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    this.deleteSubcription = dialogRef
      .afterClosed()
      .pipe(
        filter((confirmation) => confirmation),
        switchMap(() => this.userService.delete(this.userId))
      )
      .subscribe(() => {
        this.navigateBack();
      });
  }
  submit($event: Event) {
    $event.preventDefault();
    let saveObservable = null;
    if (!this.userId || this.userId < 0) {
      saveObservable = this.userService.add(this.user);
    } else {
      console.log(this.user);
      saveObservable = this.userService.update(this.user);
    }
    this.saveSubcription = saveObservable.subscribe(() => this.navigateBack());
  }
}
