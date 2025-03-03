import {inject, Injectable} from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { APP_CONSTANTS } from '@shared/constants';
import { Contact } from './contact.interfaces';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class ContactService{
    private readonly _firestore = inject(Firestore);
    private readonly _contactCollection = collection(this._firestore, APP_CONSTANTS.COLLECCION_NAME);

    newContact(contact:Partial<Contact>):Promise<DocumentReference<DocumentData, DocumentData>>{
        return addDoc(this._contactCollection, {
            created: Date.now(),
            update: Date.now(),
            ...contact
        })
    }
    getAllContacts(): Observable<Contact[]>{
        const queryFn = query(this._contactCollection, orderBy('created', 'desc'))
        return collectionData(queryFn, {idField: 'id'}) as Observable<Contact[]>
    }

    async getContactById(id:string):Promise<Contact>{
        const docRef = this._getDocRef(id);
        const DocumentData = await getDoc(docRef);
        return DocumentData.data() as Contact;
    }

    updateContact(id:string, contact:Contact):void{
        const docRef = this._getDocRef(id);
        updateDoc(docRef, {...contact});
    }

    deleteContact(id:string):void{
        const docRef = this._getDocRef(id);
        deleteDoc(docRef);
    }

    private _getDocRef(id:string){
        return doc(this._firestore, APP_CONSTANTS.COLLECCION_NAME, id);
    }
}