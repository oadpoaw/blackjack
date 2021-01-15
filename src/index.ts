import Deck from './Deck';;
import Card from './Card';
import { prompt } from 'inquirer';

function getValue(cards: Card[]): number {
    let val = 0;
    for (const card of cards) {
        const temp = val + card.value;
        if (temp > 21 && cards.some((c) => c.value === 11)) {
            val = temp - 10;
            continue;
        }
        val = temp;
    }
    return val;
}

(async function () {

    const deck = new Deck();

    deck.shuffle();

    const me: Card[] = [];
    const dealer: Card[] = [];

    me.push(deck.draw(), deck.draw());
    dealer.push(deck.draw(), deck.draw());

    while (getValue(me) === 21) {
        deck.insert(...me.splice(0, me.length));
        me.push(deck.draw(), deck.draw());
    }

    while (true) {
        const val = getValue(dealer);
        if (val === 21) {
            deck.insert(...dealer.splice(0, dealer.length));
            dealer.push(deck.draw(), deck.draw());
        } else if (val > [13, 14, 15, 16][Math.floor(Math.random() * 4)]) {
            break;
        } else {
            dealer.push(deck.draw());
        }
    }

    let won = false;
    let r21 = false;
    let r21_dealer = false;
    let pontoon = false;
    let pontoon_dealer = false;
    let busted = false;
    let busted_dealer = false;
    let tie = false;

    while (true) {
        console.log('-'.repeat(20));
        console.log('Your cards:');
        console.log(`${me.map(({ display }) => `[${display}]`).join(' ')}`);
        console.log(`Value: ${getValue(me)}`);
        console.log('-'.repeat(20));
        console.log(`Dealer's cards:`);
        console.log(`[${dealer[0].display}] [?]`);
        console.log('Value: ?');
        console.log('-'.repeat(20));

        const action: 'hit' | 'stand' = await prompt([
            {
                type: 'list',
                message: 'Action:',
                name: 'action',
                default: 'stand',
                choices: ['hit', 'stand'],
            }
        ]).then((opt) => opt.action);

        console.log(action);

        if (action === 'hit') me.push(deck.draw());

        const score = getValue(me);
        const score_dealer = getValue(dealer);

        /** Rules */

        if (action === 'hit') {
            if (me.length >= 5 && score <= 21) {
                pontoon = true;
                won = true;
                break;
            }
            if (score === 21 && score_dealer === 21) {
                tie = true;
                break;
            }
            if (score === 21) {
                r21 = true;
                won = true;
                break;
            }
            if (score > 21) {
                busted = true;
                break;
            }
        } else if (action === 'stand') {
            if (dealer.length >= 5 && score_dealer <= 21) pontoon_dealer = true;
            if (score_dealer === 21) r21_dealer = true;
            if (score_dealer > 21) {
                busted_dealer = true;
                won = true;
            }
            if (score > score_dealer) won = true;
            if (!pontoon_dealer && score_dealer === score) tie = true;
            break;
        }
    }

    console.log('-'.repeat(20));
    console.log('Your cards:');
    console.log(`${me.map(({ display }) => `[${display}]`).join(' ')}`);
    console.log(`Value: ${getValue(me)}`);
    console.log('-'.repeat(20));
    console.log(`Dealer's cards:`);
    console.log(`${dealer.map(({ display }) => `[${display}]`).join(' ')}`);
    console.log(`Value: ${getValue(dealer)}`);
    console.log('-'.repeat(20));

    if (won) console.log('YOU WON!');
    else if (!tie && !won) console.log('YOU LOSE!');

    if (!tie) {
        if (pontoon) console.log('- Reached 5 or more cards without going over 21');
        if (pontoon_dealer) console.log('- Dealer reached 5 cards without going over 21');
        if (r21) console.log('- You reached 21!');
        if (r21_dealer) console.log(`- Dealer reached 21 before you did`);
        if (busted) console.log(`- BUSTED! You reached over 21`);
        if (busted_dealer) console.log(`- Dealer BUSTED! reached over 21`);
    } else console.log('IT\'S A TIE!');

    console.log(`- You have a score of ${getValue(me)}, Dealer has a score of ${getValue(dealer)}`);

}());