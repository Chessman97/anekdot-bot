import Telegraf from 'telegraf';

import { env } from '../../env';

export class TelegrafBot {
    private static _instance: TelegrafBot;
    public bot: any;
    private constructor() {
        this.bot = new Telegraf(env.telegram.botToken);
    }

    public static get Instance(): TelegrafBot  {
        return this._instance || (this._instance = new this());
    }

}
