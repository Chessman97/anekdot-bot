import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

import { Logger } from '../../lib/logger';

export const startScene = new Scene('start');
const log = new Logger(__filename);

startScene.enter(async (ctx: any) => {
    ctx.reply('Выберите действие', Markup
        .keyboard([
            ['Сгенерировать случайный анекдот🤣'],
            ['Анекдот из базы данных🤙'],
            ['Добавить анекдот в базу данных🤔'],
        ])
        .oneTime()
        .resize()
        .extra()
    );
    log.info('startScene:enter');
});

startScene.hears('Сгенерировать случайный анекдот🤣', async (ctx: any) => {
    log.info('startScene:generate');
    ctx.scene.enter('generate_anecdote');
});

startScene.hears('Анекдот из базы данных🤙', async (ctx: any) => {
    log.info('startScene:get_anecdote');
    ctx.scene.enter('get_anecdote');
});

startScene.hears('Добавить анекдот в базу данных🤔', async (ctx: any) => {
    log.info('startScene:add_anecdote');
    ctx.scene.enter('add_anecdote');
});
