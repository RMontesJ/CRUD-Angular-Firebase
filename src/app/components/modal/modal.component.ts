import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from './modal.service';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule];
@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: `./modal.component.scss`
})
export class ModalComponent implements OnInit{

  contactForm!: FormGroup

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);

ngOnInit(): void {
  this._buildForm();
  this.contactForm.patchValue(this._matDialog.data);
  if(this._matDialog.isEditing){
    this._disabledForm();
  }
}

async onSubmit(){
  let message = 'Contact edited succesfully';
  const contact = this.contactForm.value;
  if(this._matDialog.data){
    this._contactSvc.updateContact(this._matDialog.data.id, contact);
  }
  else{
   await this._contactSvc.newContact(contact);
    message = 'Contact added succesfully';
  }

  this._modalSvc.closeModal();

}

getTitle():string{
  return this._matDialog.data ? 'Edit contact' : 'Add contact'
}

private _disabledForm(): void{
this.contactForm.disable();
}

private _buildForm():void{
  this.contactForm = this._fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });
}

}
