import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  loading = false;
  user:User;
  userId:string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.loading = true;
    this.firestore.collection('user').doc(this.userId).update(this.user.toJson()).then(()=>{
      this.dialogRef.close();
      this.loading = false;
    })
  }

}
