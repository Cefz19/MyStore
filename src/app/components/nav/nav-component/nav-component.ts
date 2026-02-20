import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
// import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-nav-component',
  imports: [
    // NgClass
  ],
  templateUrl: './nav-component.html',
  styleUrls: ['./nav-component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    }); 
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
