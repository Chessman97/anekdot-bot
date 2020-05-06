import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';

import { env } from '../../env';
import { Logger } from '../logger/Logger';
import { editWordsChannelScene } from './scenes/editWordsChannelScene';
import { listChannelScene } from './scenes/listChannelScene';
import { startScene } from './scenes/startScene';

const log = new Logger(__filename);
const bot = new Telegraf(env.telegram.botToken);
// const userService = Container.get<UserService>(UserService);

// Консоль телеграма для отладки
bot.use(Telegraf.log());

// Обработка ошибок
bot.catch((err: any) => {
    log.error('TelegramBotLoader:error', { error: err });
});

const stage = new Stage([
    listChannelScene,
    startScene,
    editWordsChannelScene,
]);

bot.use(session());
bot.use(stage.middleware() as any);
bot.startPolling();

// Открытие начального меню
bot.start(async (ctx: any) => {
    // await userService.addUser(ctx);
    ctx.scene.enter('start');
});

bot.hears('Назад', async (ctx: any) => {
    ctx.scene.enter('start');
});

export { bot };
