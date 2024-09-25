const express = require('express');
const axios = require('axios');

const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())




app.post('/', async (req, res) => {

    const { name, phoneNumber, size, modelType, color, carBody } = req.body;
    console.log(req.body)
    const chatId = '-4504987606';
    const url = "https://api.telegram.org/bot7320341686:AAEsJR4OmqOz3zczjcnahy854A12olpazU8/sendMessage";

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    let number = getRandomInt(5000)


    // Убедитесь, что сообщение присутствует
    if (!name || !phoneNumber || !size || !modelType || !color) {
        return res.status(400).json({ success: false, name: 'Все поля обязательны' });
    }

    try {


        // Формируем текст сообщения в зависимости от наличия carBody
        const messageText = `Заказ:#${number}, Пользователь:${name}, Номер телефона:${phoneNumber}, Размер:${size}, Модель:${modelType}, Цвет:${color}` +
        (carBody ? `, Кузов:${carBody}` : '');

        const response = await axios.post(url, {
            chat_id: chatId,
            text: messageText
        });


        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ success: false, message: 'Не удалось сделать заказ, свяжитесь с нами по телефону' });
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


