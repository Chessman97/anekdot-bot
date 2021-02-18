import iconv from 'iconv-lite';
import fetch from 'node-fetch';

export const rzhunemoguRequest = async (type: string): Promise<any> => {
    const response: fetch.Response = await fetch(`http://rzhunemogu.ru/RandJSON.aspx?CType=${type}`, {
        method: 'get',
    });
    const buffer = await response.buffer();
    const decodeText = iconv.decode(buffer, 'win1251');
    return decodeText.slice(12, -3);
};
