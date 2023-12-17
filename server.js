const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js'); // Kullanıcı modeli

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Sunucu kök dizinindeki 'public' klasörüne erişim izni veriyoruz.

// MongoDB bağlantısı
const MONGODB_URI = 'mongodb+srv://user:<password>@cluster0.mxhhrdd.mongodb.net/?retryWrites=true&w=majority'; // MongoDB Atlas'tan aldığınız bağlantı URL'si
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error: ', err);
    });

// POST endpoint'i
app.post('/submit-email', async (req, res) => {
    try {
        const { email } = req.body;

        const newUser = new User({ email });
        await newUser.save();

        await sendMail(email);

        res.status(201).json({ message: 'E-posta başarıyla kaydedildi ve gönderildi.' });
    } catch (err) {
        res.status(500).json({ message: 'E-posta kaydedilemedi veya gönderilemedi.' });
    }
});

// Mail gönderme fonksiyonu
const nodemailer = require('nodemailer');

// Mail gönderme fonksiyonu
async function sendMail(toEmail) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'deneme@gmail.com',
                pass: 'hldfkfgf3jR4twnt43tt5ktrB6x'
            }
        });

        const githubImageUrl = 'https://raw.githubusercontent.com/kullanici_adi/proje_adi/main/images/gorsel.jpg';

        const mailOptions = {
            from: 'lodomcreations@gmail.com',
            to: toEmail,
            subject: 'Beyaz Tavşan Burada(!)',
            html: `
                <p>Merhaba,</p>
                <p>İşte GitHub'dan barındırılan bir görsel:</p>
                <img src="${githubImageUrl}" alt="GitHub Görsel">
                <p>Görselin açıklama metni buraya gelecek.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', toEmail);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


// Server'ı dinle
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
