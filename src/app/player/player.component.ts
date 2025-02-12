import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: string = 'Peter';
  @Input() playerActive: boolean = false;
}

