import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-script-hack',
  templateUrl: './script-hack.component.html',
  styleUrls: ['./script-hack.component.scss']
})
export class ScriptHackComponent implements OnInit, AfterViewInit {

  @Input() src: string;

  @Input() type: string;

  @ViewChild('script') script: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  convertToScript() {
      const element = this.script.nativeElement;
      const script = document.createElement('script');
      script.type = this.type ? this.type : 'text/javascript';
      if (this.src) {
          script.src = this.src;
      }
      if (element.innerHTML) {
          script.innerHTML = element.innerHTML;
      }
      const parent = element.parentElement;
      parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
      this.convertToScript();
  }

}
