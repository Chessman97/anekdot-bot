import * as express from 'express';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async parseApiKeyAuthFromRequest(req: express.Request): Promise<boolean> {
        const apiKey = req.header('secret');
        if (apiKey) {
            this.log.info('Api key auth', { token: apiKey });
            if (apiKey === env.app.apiKey) {
                return true;
            }
        }
        return false;
    }

}
