import { Component, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './website/components/allproducts/products-component/products-component';
import { NavComponent } from './website/components/nav/nav-component/nav-component';

import { UsersService } from './services/users.service';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NavComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('my-store');

  // token =  '';
  imgRta: SafeUrl | string | null = null;
  urlPure: string = '';

  constructor(
    private usersService: UsersService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
  ) {}

  createUser() {
    this.usersService
      .create({
        name: 'Sebas',
        email: 'sebas@mail.com',
        password: '1212',
        avatar: 'https://picsum.photos',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  downloadPDF() {
    this.fileService.getFile('my-pdf', 'raw.githubusercontent.com', 'application/pdf').subscribe({
      next: () => console.log('Descargado con éxito'),
      error: (error) => console.error('Error de red o CORS:', error),
    });
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      const localUrl = URL.createObjectURL(file);
      this.imgRta = this.sanitizer.bypassSecurityTrustUrl(localUrl);
      this.fileService.uploadFile(file).subscribe((rta) => {
        console.log('Response serve', rta);
        this.urlPure = rta.location;
        this.imgRta = this.sanitizer.bypassSecurityTrustUrl(rta.location);
      });
    }
  }

  openImage() {
    if (this.urlPure) {
      window.open(this.urlPure, '_blank');
    }
  }

  // login() {
  //   this.authService.login('sebas@mail.com', '1212')
  //   .subscribe((rta) => {
  //     this.token = rta.access_token;
  //     // console.log(rta.access_token);
  //   });
  // }

  // getProfile() {
  //   this.authService.profile(this.token)
  //   .subscribe(profile => {
  //     console.log(profile);

  //   })
  // }

  // imgParent = '';
  // showImg = true;

  // onLoaded(img: string) {
  //   console.log('Loader father', img);
  // }
  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
