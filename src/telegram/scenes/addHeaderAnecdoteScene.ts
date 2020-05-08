import Scene from 'telegraf/scenes/base';

import { Logger } from '../../lib/logger';

export const addHeaderAnecdoteScene = new Scene('add_header_anecdote');
const log = new Logger(__filename);

addHeaderAnecdoteScene.enter(async (ctx: any) => {
    log.info('addHeaderAnecdoteScene:enter');
    await ctx.reply(`Введите название анекдота: `);
});

addHeaderAnecdoteScene.hears(/(.+)$/, async (ctx: any) => {
    log.info('addHeaderAnecdoteScene:add_anecdote', { text: ctx.message.text });
    const redisClient = (global as any).frameworkSettings.getData('redis_client');
    await redisClient.setAsync(ctx.message.chat.id, JSON.stringify({ header: ctx.message.text }), 'EX', 300);
    ctx.scene.enter('add_anecdote');
});
