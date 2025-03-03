import { Component, AfterViewInit, ViewChild, input, OnInit, viewChild, signal, effect, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInput} from '@angular/material/input';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule]

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
  selector: 'app-grid',
  imports: [FilterComponent, MATERIAL_MODULES],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent<T> implements OnInit {

displayedColumns = input.required<string[]>();
data = input.required<T[]>();
sortableColumns = input<string[]>([]);

dataSource = new MatTableDataSource<T>();
valueToFilter = signal('');
private readonly _sort = viewChild.required<MatSort>(MatSort);
private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
private readonly _contactSvc = inject(ContactService);
private readonly _modalSvc = inject(ModalService);

constructor(){
  effect(() => {
    if(this.valueToFilter()){
      this.dataSource.filter = this.valueToFilter();
    } else{
      this.dataSource.filter = '';
    }
  }, {allowSignalWrites: true})
}

ngOnInit(): void {
  this.dataSource.data = this.data();
  this.dataSource.sort = this._sort();
  this.dataSource.paginator = this._paginator();
}

openEditForm(data: T):void{
this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data);
}

deleteContact(id:string):void{
  const confirmation = confirm("Are you sure?");
  if(confirmation){
    this._contactSvc.deleteContact(id);

  }
}

}