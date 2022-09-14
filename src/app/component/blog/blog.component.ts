import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  dd = 'topright';

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.cc();
    }, 3000);
  }

  cc() {
    if (this.dd == 'topright') {
      this.dd = 'bottomright';
    } else if (this.dd == 'bottomright') {
      this.dd = 'bottomleft';
    } else if (this.dd == 'bottomleft') {
      this.dd = 'topleft';
    } else if (this.dd == 'topleft') {
      this.dd = 'topright';
    }
  }
}
