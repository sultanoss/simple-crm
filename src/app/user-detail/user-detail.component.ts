import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId = '';
  currentUser: User = new User();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      this.userId = param.get('id');
    })
    this.getUser();
  }

  getUser() {

    this.firestore.collection('user').doc(this.userId).valueChanges().subscribe((currentUser: any) => {
      this.currentUser = new User(currentUser);
      console.log('abgerufene user', this.currentUser);

    });
  }

  editUserMenu() {

    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJson());
    dialog.componentInstance.userId = this.userId;
  }

  editAdressMenu() {

    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user =  new User(this.currentUser.toJson());
    dialog.componentInstance.userId = this.userId;

  }

  saveUser(){

  }

}
