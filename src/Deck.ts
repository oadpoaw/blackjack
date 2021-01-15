import Card from './Card';
import Cards from './Cards';

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default class Deck {
    private _array: Card[];
    public constructor() {
        this._array = Cards;
    }
    public draw() {
        return this._array.pop();
    }
    public shuffle() {
        this._array = shuffleArray(this._array);
    }
    public reset() {
        this._array = Cards;
        this.shuffle();
    }
    public insert(...items: Card[]) {
        this._array.push(...items);
        this.shuffle();
    }
}