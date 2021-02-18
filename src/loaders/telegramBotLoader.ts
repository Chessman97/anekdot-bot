
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Telegraf, { Stage } from 'telegraf';
import session from 'telegraf/session';
import { Container } from 'typedi';

import { AnecdoteService } from '../api/services/AnecdoteService';
import { UserService } from '../api/services/UserService';
import { Logger } from '../lib/logger';
import { TelegrafBot } from '../lib/telegraf';
import { addAnecdoteScene } from '../telegram/scenes/addAnecdoteScene';
import { generateAnecdoteScene } from '../telegram/scenes/generateAnecdoteScene';
import { getAnecdoteScene } from '../telegram/scenes/getAnecdoteScene';
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
        startScene,
        addAnecdoteScene,
        getAnecdoteScene,
        generateAnecdoteScene,
    ]);

    telegraf.bot.use(session());
    telegraf.bot.use(stage.middleware() as any);
    telegraf.bot.startPolling();

    // Открытие начального меню
    telegraf.bot.start(async (ctx: any) => {
        const userService = Container.get<UserService>(UserService);
        await userService.addUser(ctx);
        ctx.scene.enter('start');
    });

    telegraf.bot.hears('Назад', async (ctx: any) => {
        ctx.scene.enter('start');
    });

    telegraf.bot.command('trash', async (ctx: any) => {
        log.info('loaders:telegramBot:command:trash');
        const userService = Container.get<UserService>(UserService);
        const anecdoteService = Container.get<AnecdoteService>(AnecdoteService);
        await userService.addUser(ctx);
        const anecdote = await anecdoteService.generateRandomAnecdote(1);
        await ctx.reply(`${anecdote.text}`);
    });

    telegraf.bot.command('boyan', async (ctx: any) => {
        log.info('loaders:telegramBot:command:boyan');
        const userService = Container.get<UserService>(UserService);
        const anecdoteService = Container.get<AnecdoteService>(AnecdoteService);
        await userService.addUser(ctx);
        const anecdote = await anecdoteService.generateRandomAnecdote(0);
        await ctx.reply(`${anecdote.text}`);
    });

    telegraf.bot.command('ebash', async (ctx: any) => {
        log.info('loaders:telegramBot:command:ebash');
        const userService = Container.get<UserService>(UserService);
        const anecdoteService = Container.get<AnecdoteService>(AnecdoteService);
        await userService.addUser(ctx);
        const anecdote = await anecdoteService.generateRandomAnecdote();
        await ctx.reply(`${anecdote.text}`);
    });

    telegraf.bot.command('old', async (ctx: any) => {
        log.info('loaders:telegramBot:command:old');
        const userService = Container.get<UserService>(UserService);
        const anecdoteService = Container.get<AnecdoteService>(AnecdoteService);
        await userService.addUser(ctx);
        const anecdote = await anecdoteService.getRandomAnecdote();
        await ctx.reply(`${anecdote.text}`);
    });

    telegraf.bot.command('last', async (ctx: any) => {
        log.info('loaders:telegramBot:command:last');
        const userService = Container.get<UserService>(UserService);
        const anecdoteService = Container.get<AnecdoteService>(AnecdoteService);
        await userService.addUser(ctx);
        const anecdote = await anecdoteService.getLastAnecdote();
        await ctx.reply(`${anecdote.text}`);
    });

    telegraf.bot.launch();
    log.info('loaders:telegramBot:connected', { telegraf });
};
