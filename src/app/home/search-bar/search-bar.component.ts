import { Component, EventEmitter, Output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  key = model<string>();
  @Output() searchEvent = new EventEmitter();

  onClick() {
    this.searchEvent.emit();
  }
}
