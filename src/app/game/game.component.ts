import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, signal, model, ChangeDetectorRef, } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, PlayerComponent, MatButtonModule, MatIconModule, FormsModule, GameDescriptionComponent, MatCardModule],
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

  constructor(private cdr: ChangeDetectorRef) { }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;

      if (this.game.stack.length > 0) {
        this.currentCard = this.game.stack.pop()!;
      }
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.pickCardAnimation = false;

        this.game.playedCards.push(this.currentCard);
        this.cdr.detectChanges();
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

      this.cdr.detectChanges();
    });
  }

}



