import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import { Container } from 'typedi';

import { AnecdoteService } from '../../api/services/AnecdoteService';
import { Logger } from '../../lib/logger';

export const addAnecdoteScene = new Scene('add_anecdote');
const log = new Logger(__filename);

addAnecdoteScene.enter(async (ctx: any) => {
    log.info('addAnecdoteScene:enter');
    await ctx.reply(`Введите новый анекдот: `, Markup.keyboard([['Назад']]).oneTime().resize().extra());
});

addAnecdoteScene.hears(/(.+)$/, async (ctx: any) => {
    log.info('addAnecdoteScene:start', { text: ctx.message.text });
    const redisClient = (global as any).frameworkSettings.getData('redis_client');
    const anecdote = JSON.parse(await redisClient.getAsync(ctx.message.chat.id));
    const anecdoteService = Container.get(AnecdoteService);
    const newAnecdote = await anecdoteService.addAnecdote(ctx.message.chat.id, anecdote.header, ctx.message.text);
    log.info('addAnecdoteScene:start:created', { anecdote: newAnecdote });
    ctx.scene.enter('start');
});

addAnecdoteScene.hears('Назад', async (ctx: any) => {
    log.info('addAnecdoteScene:start');
    ctx.scene.enter('start');
});
