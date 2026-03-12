import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav-component/nav-component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout.component',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

}
