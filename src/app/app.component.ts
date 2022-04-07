import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titles: string[] = [];
  title: string = '';
  content!: string;
  ngOnInit(): void {
    for (let [key, value] of Object.entries(localStorage)) {
      this.titles.push(key);
    }
  }
  onClickTitle(tit: string) {
    this.title = tit;
    this.content = localStorage.getItem(tit) || '';
  }
  onClickDelete(title: string) {
    localStorage.removeItem(title);
    this.titles = this.titles.filter((tle) => tle !== title);
  }
  onClickAdd() {
    this.title = '';
    this.content = '';
  }
  getContents(title: string) {
    if (!this.titles.find((tl) => tl === title)) {
      this.titles.push(title);
    }
  }
}
