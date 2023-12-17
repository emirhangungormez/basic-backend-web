const fs = require('fs');
const xlsx = require('xlsx');
const User = require('./models/user.js'); // Kullanıcı modeli

(async () => {
    try {
        const allEmails = await User.find({}).maxTimeMS(30000).select('email');


        // Verileri uygun formatta hazırla
        const jsonData = allEmails.map((email) => {
            return { Email: email.email }; // Örnek olarak "Email" başlığı altında e-postaları saklıyoruz
        });

        // Excel için bir çalışma sayfası oluştur
        const worksheet = xlsx.utils.json_to_sheet(jsonData);

        // Yeni bir çalışma kitabı oluştur ve sayfayı ekleyin
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Emailler');

        // Excel dosyasını oluştur ve kaydet
        const excelFilePath = 'emails.xlsx'; // Dosya adını ve yolunu belirleyin
        xlsx.writeFile(workbook, excelFilePath);

        console.log('Excel dosyası oluşturuldu:', excelFilePath);
    } catch (error) {
        console.error('Hata:', error);
    }
})();
