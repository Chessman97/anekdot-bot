
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { Logger } from '../lib/logger';
import { bot } from '../lib/telegram';

const log = new Logger(__filename);

export const telegramBotLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    // launch telegram bot
    bot.launch();
    log.info('telegram bot connected');
};
