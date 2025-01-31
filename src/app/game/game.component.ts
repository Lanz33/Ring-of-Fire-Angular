import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, signal, model } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, PlayerComponent, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  takeCardAnimation = false;
  game: Game = new Game;
  currentCard: string = '';

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.takeCardAnimation) {
      this.takeCardAnimation = true;
      this.currentCard = this.game.stack.pop() || '';
      console.log(this.currentCard);
      

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players = [...this.game.players, name];
      console.log(this.game.players);
    });
  }
}



