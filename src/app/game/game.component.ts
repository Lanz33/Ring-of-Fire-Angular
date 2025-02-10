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
  pickCardAnimation: boolean = false;
  game: Game = new Game;
  currentCard: string = "ace";

  readonly name = model('');
  readonly dialog = inject(MatDialog);



  newGame() {
    this.game = new Game();
  }

  takeCard() {
    console.log(this.pickCardAnimation);
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      if (this.game.stack.length > 0) {
        this.currentCard = this.game.stack.pop()!;
      }
      
      console.log('true???  ', this.pickCardAnimation);
      console.log(this.currentCard);


      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        console.log('false????   ', this.pickCardAnimation);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name() },
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (!name) {
        return;
      }
      this.game.players = [...this.game.players, name];
      console.log(this.game.players);
    });
  }

}



