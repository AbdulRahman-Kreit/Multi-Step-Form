// Icons
import Arcade from '../../public/icon-arcade.svg';
import Advanced from '../../public/icon-advanced.svg';
import Pro from '../../public/icon-pro.svg';

type Card = {
    id: number,
    icon: string,
    alt: string,
    name: string,
    value: number,
    planKey: 'arcade' | 'advanced' | 'pro'
};

export const planCards: Card[] = [
    { id: 1, icon: Arcade, alt: 'Arcade Icon', name: 'Arcade', value: 9, planKey: 'arcade' },
    { id: 2, icon: Advanced, alt: 'Advanced Icon', name: 'Advanced', value: 12, planKey: 'advanced' },
    { id: 3, icon: Pro, alt: 'Pro Icon', name: 'Pro', value: 15, planKey: 'pro' },
];

type Item = {
    id: number,
    name: string,
    description: string,
    value: number,
    key: 'onlineService' | 'largerStorage' | 'customizableProfile'
};

export const addOnsCards: Item[] = [
    { id: 1, name: 'Online service', description: 'Access to multiplayer games', value: 1, key: 'onlineService' },
    { id: 2, name: 'Larger storage', description: 'Extra 1TB of cloud save', value: 2, key: 'largerStorage' },
    { id: 3, name: 'Customizable profile', description: 'Custom theme on your profile', value: 2, key: 'customizableProfile' },
];