const express = require('express');
const axios = require('axios');

const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://teplohranitel-avto.ru', // замените на URL вашего клиента
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // разрешенные методы
}))
app.use(express.json())




app.post('/', async (req, res) => {

    const { name, phoneNumber, size, modelType, color } = req.body;
    console.log(req.body)
    const chatId = '704830988';
    const url = "https://api.telegram.org/bot7320341686:AAEsJR4OmqOz3zczjcnahy854A12olpazU8/sendMessage";

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    let number = getRandomInt(5000)


    // Убедитесь, что сообщение присутствует
    if (!name || !phoneNumber || !size || !modelType || !color) {
        return res.status(400).json({ success: false, name: 'name is required' });
    }

    try {
        const response = await axios.post(url, {
            chat_id: chatId,
            text: `Заказ:#${number}, Пользователь:${name}, Номер телефона:${phoneNumber}, Размер:${size}, Модель:${modelType}, Цвет:${color}`
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ success: false, message: 'Не удалось сделать заказ, свяжитесь с нами по телефону' });
    }
});


app.get('/api', (req, res) => {
    res.send('API работает!');
});
app.get('/', (req, res) => {
    res.send('API работает!');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


