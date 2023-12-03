import TelegramApi from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';
import { config } from "dotenv";
import { CampsController } from './db/controllers/index.js';

import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

config()
const token = process.env.TELEGRAM_BOT_TOKEN
const webAppUrl = process.env.USER_URL
const webAppUrlAdmin = process.env.ADMIN_URL

const bot = new TelegramApi(token, { polling: true })
const app = express()

app.use(express.json())
app.use(cors())

const startOptions = {
    reply_markup: {
        inline_keyboard: [
            [{ text: `${String.fromCodePoint(parseInt("2705", 16))} Посмотреть сводку`, web_app: { url: webAppUrl } }],
            [{ text: `${String.fromCodePoint(parseInt("2712", 16))} Внести информацию`, web_app: { url: webAppUrlAdmin } }]
        ]
    }
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/s/sito_vk/sito_vk_001.webp?v=1697025302')

            let welcomeMsg = `
Добро пожаловать в SPObot!

С моей помощью можно посмотреть актуальную сводку лагерей или обновить информацию.

Что ты хочешь сделать? ${String.fromCodePoint(parseInt("1F447", 16))}
                    `
            return bot.sendMessage(chatId, welcomeMsg, startOptions)
        }

        bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/s/sito_vk/sito_vk_013.webp?v=1697025302')
        bot.sendMessage(chatId, 'Прости, но я тебя не понимаю')
    })

}

start()

app.get('/camps', CampsController.get);
app.post('/camp', CampsController.create);
app.delete('/camps/:id', CampsController.remove);
app.patch('/camps/:id', CampsController.update);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});