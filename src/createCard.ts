import Card from './Card';
import CardSym from './CardSym';

export default function createCard(type: keyof typeof CardSym, value: string | number): Card {
    const cctype: string = value as string;
    if (value === 'k' || value === 'q' || value === 'j' || value === '10') value = 10;
    else if (value === 'a') value = 11;
    else value = parseInt(value as string);
    return {
        display: CardSym[type](cctype.toUpperCase()),
        value: value as number,
    }
}