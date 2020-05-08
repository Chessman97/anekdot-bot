import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

export const startScene = new Scene('start');

startScene.enter(async (ctx: any) => {
    ctx.reply('Выберите действие', Markup
        .keyboard([
            ['Информация', 'Добавить анекдот'],
        ])
        .oneTime()
        .resize()
        .extra()
    );
});

startScene.hears('Информация', async (ctx: any) => {
    ctx.scene.enter('info');
});

startScene.hears('Добавить анекдот', async (ctx: any) => {
    ctx.scene.enter('add_anecdote');
});
