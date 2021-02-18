import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';
import { Container } from 'typedi';

import { AnecdoteService } from '../../api/services/AnecdoteService';
import { Logger } from '../../lib/logger';

export const generateAnecdoteScene = new Scene('generate_anecdote');
const log = new Logger(__filename);

generateAnecdoteScene.enter(async (ctx: any) => {
    log.info('generateAnecdoteScene:enter');
    const anecdoteService = Container.get(AnecdoteService);
    const newAnecdote = await anecdoteService.generateRandomAnecdote();
    if (newAnecdote) {
        await ctx.reply(
            `${newAnecdote.text}`,
            Markup.keyboard([['Назад']]).oneTime().resize().extra()
        );
    } else {
        await ctx.reply(
            `К сожалению, в базе еще нет анекдотов.\nВы можете сгенерировать случайный и он попадет в нашу базу данных или добавить вручную!`,
            Markup.keyboard([['Назад']]).oneTime().resize().extra()
        );
    }
});

generateAnecdoteScene.hears('Назад', async (ctx: any) => {
    log.info('generateAnecdoteScene:start');
    ctx.scene.enter('start');
});
