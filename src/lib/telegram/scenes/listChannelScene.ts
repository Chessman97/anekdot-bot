import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

export const listChannelScene = new Scene('list_channel');

listChannelScene.enter(async (ctx: any) => {
    // const orderService = Container.get(OrderService);
    // const orders = await orderService.getOrdersByUser(ctx.message.chat.id);
    // console.log(orders);
    // const buttonsOrder = [];
    // for (const order of orders) {
    //     buttonsOrder.push(Markup.callbackButton(`${order.channelFromUrl} - ${order.channelToUrl}`, 'menuListChannels' + ':' + order.id));
    // }
    // await ctx.reply('Выберите канал',
    //     Extra.HTML().markup((m: any) =>
    //         m.inlineKeyboard(
    //             buttonsOrder,
    //             { columns: 1 }
    //         )
    //     )
    // );
    ctx.reply('В главное меню', Markup
        .keyboard([
            ['Назад'],
        ])
        .oneTime()
        .resize()
        .extra()
    );
});

listChannelScene.action(/menuListChannels:(.+)$/, async (ctx: any) => {
    console.log(ctx.callbackQuery.data);
    console.log(ctx.callbackQuery.data.split(':')[1]);
    console.log(ctx.callbackQuery.message.chat.id);
    const redisClient = (global as any).frameworkSettings.getData('redis_client');
    await redisClient.setAsync(ctx.callbackQuery.message.chat.id + 'channel', ctx.callbackQuery.data.split(':')[1]);
    ctx.scene.enter('editChannel');
});

listChannelScene.hears('Назад', async (ctx: any) => {
    ctx.scene.enter('start');
});
