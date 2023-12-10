document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/submit-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log('Email submitted successfully');
            // E-posta başarıyla gönderildiğinde istediğiniz işlemleri burada yapabilirsiniz (örneğin, başka bir sayfaya yönlendirme)
            window.location.href = 'succes.html'; // Yönlendirme yapılacak sayfanın URL'si
        } else {
            console.error('Failed to submit email');
        }
    } catch (error) {
        console.error('Error submitting email:', error);
    }
});
