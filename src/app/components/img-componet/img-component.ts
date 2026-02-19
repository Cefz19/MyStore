import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-img-component',
  imports: [],
  templateUrl: './img-component.html',
  styleUrls: ['./img-component.scss'],
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {


  img: string = '';


  @Input('img') 
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('Change just Img =>', this.img );
    
    // code
  }

  @Input() alt: string = '';

  @Output() loaded = new EventEmitter<string>();
  imageDefault = 'default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    //Before of render
    // No async --
    //Only once time
    // console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    //before and during of render
    //changesinputs -- time
    // console.log('ngOnChanges', 'imgValue =>', this.img);
    // console.log('Changes',changes);
  }

  ngOnInit(): void {
    //before render
    // Yes async -- fetch only once time
    // console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run time');
    // }, 1000);
  }


  ngAfterViewInit() {
    //after render
    // handler children
    // console.log('ngAfterViewInit');
  }
  ngOnDestroy() {
    //Delete of component or finished
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoader() {
    console.log('loader son');
    this.loaded.emit(this.img);
  }
}
