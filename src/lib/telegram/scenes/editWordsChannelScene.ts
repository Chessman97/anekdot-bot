import Scene from 'telegraf/scenes/base';

export const editWordsChannelScene = new Scene('editWordsChannel');
// const orderService = Container.get(OrderService);

editWordsChannelScene.enter(async (ctx: any) => {
    // const redisClient = (global as any).frameworkSettings.getData('redis_client');
    // const orderId = await redisClient.getAsync(ctx.callbackQuery.message.chat.id + 'channelEditWords');
    // const order = await orderService.getOrderById(orderId);
    // await ctx.reply(
    //     `Ключевые слова: ${order.words}\n\n` +
    //     `Введите новые ключевые слова: `
    // );
});

editWordsChannelScene.hears(/(.+)$/, async (ctx: any) => {
    // const redisClient = (global as any).frameworkSettings.getData('redis_client');
    // const orderId = await redisClient.getAsync(ctx.message.chat.id + 'channelEditWords');
    // const order = await orderService.getOrderById(orderId);
    // order.words = ctx.message.text;
    // await orderService.editOrder(order);
    // await ctx.reply('Подписка изменена');
    ctx.scene.enter('start');
});
