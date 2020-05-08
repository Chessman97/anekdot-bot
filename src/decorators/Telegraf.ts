import { Container } from 'typedi';

import { TelegrafBot as CustomTelegraf } from '../lib/telegraf';

export function JPush(): ParameterDecorator {
    return (object, propertyKey, index): any => {
        const bot = CustomTelegraf.Instance;
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Container.registerHandler({ object, propertyName, index, value: () => bot });
    };
}

export { TelegrafBotInterface } from '../lib/telegraf';
