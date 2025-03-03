import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card'
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { Contact } from '@features/contacts/contact.interfaces';

const MATERIAL_MODULES = [MatCardModule]

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contacts';

private readonly _modalSvc = inject(ModalService);

  onClickNewContact():void{
    this._modalSvc.openModal<ModalComponent, Contact>(ModalComponent);
  }
}
