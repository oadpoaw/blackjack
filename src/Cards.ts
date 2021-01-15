import Card from './Card';
import CardSym from './CardSym';
import createCard from './createCard';

export default (function () {
    const cards: Card[] = [];

    for (const k in CardSym) {
        const key = k as keyof typeof CardSym;
        cards.push(createCard(key, 'k'));
        cards.push(createCard(key, 'q'));
        cards.push(createCard(key, 'j'));
        for (let i = 2; i < 11; i++) {
            cards.push(createCard(key, `${i}`))
        }
        cards.push(createCard(key, 'a'));
    }

    return cards;
}());