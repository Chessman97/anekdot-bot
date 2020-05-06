import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

export const startScene = new Scene('start');

startScene.enter(async (ctx: any) => {
    ctx.reply('Выберите действие', Markup
        .keyboard([
            ['Список подписок', 'Добавить подписку'],
        ])
        .oneTime()
        .resize()
        .extra()
    );
});

startScene.hears('Список подписок', async (ctx: any) => {
    ctx.scene.enter('list_channel');
});

startScene.hears('Добавить подписку', async (ctx: any) => {
    ctx.scene.enter('add_channel');
});
