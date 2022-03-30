import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  loading = false;
  user = new User()
  birthDate: Date;
  constructor( private firestore: AngularFirestore,private dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user ist', this.user);
    this.firestore.collection('user').add(this.user.toJson()).then((result: any) => {
      this.loading = false;
      console.log('user finished', result)
      this.dialogRef.close();
    })
  }
}
