import Scene from 'telegraf/scenes/base';
import { Container } from 'typedi';

import { UserService } from '../../api/services/UserService';

export const addAnecdoteScene = new Scene('add_anecdote');

addAnecdoteScene.enter(async (ctx: any) => {
    const userService = Container.get(UserService);
    await userService.find();
    await ctx.reply(`Введите новый анекдот: `);
});

addAnecdoteScene.hears(/(.+)$/, async (ctx: any) => {
    // const redisClient = (global as any).frameworkSettings.getData('redis_client');
    // const orderId = await redisClient.getAsync(ctx.message.chat.id + 'channelEditWords');
    // const order = await orderService.getOrderById(orderId);
    // order.words = ctx.message.text;
    // await orderService.editOrder(order);
    // await ctx.reply('Подписка изменена');
    ctx.scene.enter('start');
});
