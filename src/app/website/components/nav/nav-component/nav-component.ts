import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
// import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

import { AuthService } from '../../../../services/auth.service';
import { CategoriesService } from '../../../../services/categories.service';

import { User } from '../../../../models/user.model';
import { Category } from '../../../../models/product.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-component.html',
  styleUrls: ['./nav-component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = signal(false);
  counter = 0;

  // token = signal('');
  profile = signal<User | null>(null);
  categories = signal<Category[]>([]);
  // token = '';
  // profile: User | null = null;

  storeService = inject(StoreService);
  authService = inject(AuthService);
  categoriesService = inject(CategoriesService);

  // Solo un filter, limpio y directo
  filteredCategories = computed(() => {
    return this.categories().filter((cat) => {
      if (!cat || !cat.name) return false;

      // 1. Quitamos espacios extra y decodificamos basura de URL
      let name = '';
      try {
        name = decodeURIComponent(cat.name).trim();
      } catch {
        name = cat.name.trim();
      }

      // 2. EXPRESIÓN REGULAR "SOLO HUMANO":
      // Solo permite: Letras (A-Z), Números (0-9), Espacios y Tildes básicas.
      // Bloquea: Emojis, símbolos raros, scripts, '=' , '$' , '[', ']', etc.
      const isHumanReadable = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(name);

      // 3. VALIDACIÓN DE LONGITUD Y PALABRAS PROHIBIDAS
      // Quitamos 'admin' (con cualquier 'a' rara) y 'victim'
      const isNotMalicious =
        !name.toLowerCase().includes('victim') &&
        !name.toLowerCase().includes('admin') &&
        !name.toLowerCase().includes('test');

      // Solo mostramos si es legible, no malicioso y tiene sentido (entre 3 y 20 caracteres)
      return isHumanReadable && isNotMalicious && name.length >= 3 && name.length < 25;
    });
  });

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (error) => {
        console.error('Error capturado por el interceptor:', error);
      },
    });
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu.update((prevState) => !prevState);
  }

  login() {
    this.authService.loginAndGet('sebas@mail.com', '1212').subscribe(
      {
        next: (user) => {
          this.profile.set(user);
        },
        error: (err) => {
          console.error('Error in the login o profile', err);
        },
      },
      // this.token.set(rta.access_token)
      // console.log(this.token);
      // this.token = rta.access_token;
      // console.log('Token recibido:', )
      // this.getProfile()
    );
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }
  getProfile() {
    this.authService.getProfile().subscribe((user) => {
      this.profile.set(user);
    });
  }
}
