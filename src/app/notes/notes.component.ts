import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnChanges {
  @Output() titleCreated = new EventEmitter<string>();
  @Output() contentsCreated = new EventEmitter<string>();

  @Input() oldtitle!: string;
  @Input() oldContent!: string;

  title!: string;
  contents!: string;
  //for button
  contentchange: string = '';
  titlechange: string = '';
  //for last change
  lasttitle!: string;
  constructor() {}

  ngOnInit(): void {
    this.title = this.oldtitle;
    this.contents = this.oldContent;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(changes['oldtitle']);
    // console.log(changes['oldContent']);

    if (changes['oldtitle']) {
      this.title = changes['oldtitle'].currentValue;
    } else {
      this.title = this.lasttitle;
    }
    if (changes['oldContent'])
      this.contents = changes['oldContent'].currentValue;
  }
  onClickSave() {
    this.titleCreated.emit(this.title);
    if (
      !localStorage.getItem(this.title) ||
      localStorage.getItem(this.title) !== this.contents
    ) {
      localStorage.setItem(`${this.title}`, this.contents);
      this.lasttitle = this.title;
      this.title = '';
      this.contents = '';
    }
  }
  onClickRevert() {
    this.contents = localStorage.getItem(this.title) || '';
  }
}
