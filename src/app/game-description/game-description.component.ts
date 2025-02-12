import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-description',
  imports: [MatCardModule],
  templateUrl: './game-description.component.html',
  styleUrl: './game-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDescriptionComponent {
  cardAction = [
    { title: 'Waterfall', description: 'Das Ass steht für den Wasserfall. Alle Spieler setzen zum trinken an. Im Uhrzeigersinn darf erst dann mit dem Trinken aufgehört werden, wenn der rechte Sitznachbar davor seinen Wasserfall beendet hat. Der Spieler, der das Ass zieht darf zu erst aufhören zu trinken (wann er will).' },
    { title: 'You', description: 'Du darfst eine Person bestimmen, die einen Schluck aus ihrem Getränk nimmt.' },
    { title: 'Me', description: 'Du musst einen Schluck trinken' },
    { title: 'Floor', description: 'Berühre mit deiner Hand den Boden. Der Mitspieler, der zuletzt den Boden berührt, muss einen Schluck trinken.' },
    { title: 'Rhyme', description: 'Such dir ein Wort aus. Im Uhrzeigersinn müssen die Mitspieler einen Reim darauf finden. Wer ein Wort wiederholt oder keinen neuen Reim mehr nennen kann, muss einen Schluck trinken.' },
    { title: 'Chicks', description: 'Die Damen der Schöpfung müssen einen Schluck trinken.' },
    { title: 'Heaven', description: 'Zeige mit deinem Zeigefinger gen Himmel. Wer zuletzt zum Himmel zeigt, muss einen Schluck trinken.' },
    { title: 'Mate', description: 'Bestimme einen Mitspieler, der von nun an jedes Mal mit dir einen Schluck trinken muss, wenn du dazu aufgefordert wirst.' },
    { title: 'Thumbmaster', description: 'Berühre mit deinem Daumen die Tischplatte. Der Mitspieler der zuletzt den Tisch berührt, muss einen Schluck trinken.' },
    { title: 'Men', description: 'Die Männer dürfen anstoßen und einen Schluck trinken.' },
    { title: 'Kingslayer', description: 'Wird ein König gezogen, darf der Spieler ein Getränk seiner Wahl in den Kingscup gießen. Wird der vierte König gezogen, so muss der Spieler unverzüglich den Kingscup in der Mitte des Spiels leeren.' },
    { title: 'Never have i ever...', description: 'Der Spieler darf eine Runde "Never have I ever..." ausrufen. Die Verlierer trinken.' },
    { title: 'Rule', description: 'Die Person, die einen Buben zieht, darf sich eine neue Spielregel ausdenken, die bis zum Ende des Spiels gilt. Die Regel darf keine anderen außer Kraft setzen.' },
  ];
  title: string = 'Kartenaktionen';
  description: string = 'Hier findest du die Beschreibung der Kartenaktionen';
  @Input() card: string = 'empty';
  
  
        ngOnChanges() {
      if (this.card && this.card !== 'empty') {
        const cardNumber = +this.card.split('_')[1];
        if (!isNaN(cardNumber) && cardNumber >= 1 && cardNumber <= this.cardAction.length) {
          this.title = this.cardAction[cardNumber - 1].title;
          this.description = this.cardAction[cardNumber - 1].description;
        } else {
          this.title = 'Ziehe eine Karte';
          this.description = 'Lies hier Beschreibung für diese Karte.';
        }
      } else {
        this.title = 'Kartenaktionen';
        this.description = 'Hier findest du die Beschreibung der Kartenaktionen';
      }
    }
}
