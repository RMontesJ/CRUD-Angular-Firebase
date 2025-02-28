import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card'

const MATERIAL_MODULES = [MatCardModule]

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contacts';

  onClickNewContact():void{
    console.log("New contact")
  }
}
