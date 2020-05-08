
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';

import { Logger } from '../lib/logger';
import { TelegrafBot } from '../lib/telegraf';
import { addAnecdoteScene } from '../telegram/scenes/addAnecdoteScene';
import { listChannelScene } from '../telegram/scenes/listChannelScene';
import { startScene } from '../telegram/scenes/startScene';

const log = new Logger(__filename);

export const telegramBotLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    const telegraf = TelegrafBot.Instance;
    // Консоль телеграма для отладки
    telegraf.bot.use(Telegraf.log());

    // Обработка ошибок
    telegraf.bot.catch((err: any) => {
        log.error('telegramBotLoader:error', { error: err });
    });

    const stage = new Stage([
        listChannelScene,
        startScene,
        addAnecdoteScene,
    ]);

    telegraf.bot.use(session());
    telegraf.bot.use(stage.middleware() as any);
    telegraf.bot.startPolling();

    // Открытие начального меню
    telegraf.bot.start(async (ctx: any) => {
        ctx.scene.enter('start');
    });

    telegraf.bot.hears('Назад', async (ctx: any) => {
        ctx.scene.enter('start');
    });

    telegraf.bot.launch();
    log.info('loaders:telegramBot:connected', { telegraf });
};
