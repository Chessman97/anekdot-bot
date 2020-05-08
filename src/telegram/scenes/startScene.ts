import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

import { Logger } from '../../lib/logger';

export const startScene = new Scene('start');
const log = new Logger(__filename);

startScene.enter(async (ctx: any) => {
    ctx.reply('Выберите действие', Markup
        .keyboard([
            ['Информация', 'Добавить анекдот'],
        ])
        .oneTime()
        .resize()
        .extra()
    );
    log.info('startScene:enter');
});

startScene.hears('Информация', async (ctx: any) => {
    log.info('startScene:info');
    ctx.scene.enter('info');
});

startScene.hears('Добавить анекдот', async (ctx: any) => {
    log.info('startScene:add_header_anecdote');
    ctx.scene.enter('add_header_anecdote');
});
