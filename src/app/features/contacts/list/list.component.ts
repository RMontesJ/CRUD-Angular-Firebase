import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { ContactService } from '../contact.service';
import { takeUntil, tap } from 'rxjs';
import { ColumnKeys, Contact } from '../contact.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [GridComponent],
  template: `
  <section>
  @if(data){
  <app-grid [displayedColumns]="displayedColumns" [data]="data" [sortableColumns]="sortables" />
  }
  </section>
  `,
})
export class ListComponent implements OnInit {

ngOnInit(): void {
  this.getAllContacts();
}

data!: Contact[];
displayedColumns: ColumnKeys<Contact> = ['id', 'name', 'phone', 'email', 'action'];
sortables:ColumnKeys<Contact> = ['id', 'name', 'phone', 'email'];


private readonly _contactSvc = inject(ContactService);
private readonly _destroyRef = inject(DestroyRef);

getAllContacts(){
  this._contactSvc.getAllContacts()
  .pipe(
    takeUntilDestroyed(this._destroyRef),
    tap((contacts:Contact[]) => this.data = [...contacts])
  )
  .subscribe()
}
}
