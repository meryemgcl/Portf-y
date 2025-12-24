document.addEventListener('DOMContentLoaded', function() {
    // 1. Typed.js Animasyonu
    // "text" sınıfına sahip elementte yazı animasyonunu başlatır.
    // 'Typed' yerine 'new Typed' kullanıldığından emin olmalısın.
    var typed = new Typed(".text", {
        strings: ["Full Stack Developer", "Web Designer", "Backend Developer", "Frontend Developer", "Data Scientist"], // Burada gösterilecek metinleri belirle
        typeSpeed: 100, // Yazma hızı
        backSpeed: 60, // Silme hızı
        backDelay: 1000, // Silmeden önceki bekleme süresi
        loop: true // Animasyonun sürekli tekrar etmesini sağlar
    });

    // 2. Navigasyon Bağlantılarını Aktif Hale Getirme ve Yumuşak Kaydırma
    // Sayfa kaydırıldığında aktif menü öğesini belirler ve tıklamalarda yumuşak kaydırma sağlar.
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Eğer sayfa kaydırma konumu, bölümün üstünden büyükse ve bölümün sonundan küçükse
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Biraz yukarıdan tetiklemek için /3 eklendi
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active'); // Tüm aktif sınıflarını kaldır
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active'); // Mevcut bölüme ait bağlantıyı aktif yap
            }
        });
    });

    // Navigasyon bağlantılarına tıklama olayı ekleyerek yumuşak kaydırma sağlar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Varsayılan bağlantı davranışını engelle
            const targetId = this.getAttribute('href'); // Tıklanan bağlantının href özelliğini al
            const targetSection = document.querySelector(targetId); // Hedef bölümü seç

            if (targetSection) {
                // Hedef bölüme yumuşak bir şekilde kaydır
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('.header').offsetHeight, // Header yüksekliğini çıkararak doğru konuma kaydır
                    behavior: 'smooth'
                });
            }
            // Mobil menü açıksa kapat (eğer hamburger menü eklersen)
            // if (navbar.classList.contains('active')) {
            //     navbar.classList.remove('active');
            //     menuIcon.classList.remove('bx-x');
            // }
        });
    });

    // 3. Yetenek Çubuğu Animasyonları (Görünür Olduğunda Tetiklenir)
    // Yetenek çubuklarının sayfada görünür hale geldiğinde animasyon yapmasını sağlar.
    const skillProgressSpans = document.querySelectorAll('.progress-line span');

    const observerOptions = {
        root: null, // Görünüm alanı (viewport) kök olarak kullanılır
        rootMargin: '0px', // Kök çevresinde ek boşluk yok
        threshold: 0.7 // Elementin %70'i görünür olduğunda tetikle
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element görünür olduğunda, data-width özelliğindeki genişliği uygula
                entry.target.style.width = entry.target.dataset.width;
                // Animasyonu başlat (eğer CSS'te başlangıçta duraklatıldıysa)
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Animasyon tetiklendikten sonra gözlemeyi bırak
            }
        });
    }, observerOptions);

    skillProgressSpans.forEach(span => {
        // HTML'deki her bir span elementine `data-width` özelliği eklediğinden emin ol.
        // Örn: <span data-width="90%"></span>
        skillObserver.observe(span);
    });

    // 4. Diğer Ek Fonksiyonlar (Örn: Hamburger Menü Geçişi)
    // Eğer CSS'te gizli bir mobil navigasyon menüsü (`navbar`'ın küçük ekranlarda `display: none` olması)
    // ve bir hamburger menü ikonu eklediysen, buraya onun geçiş kodunu ekleyebilirsin.
    // Örnek:
    // const menuIcon = document.querySelector('#menu-icon'); // Menü ikonunun ID'si
    // const navbar = document.querySelector('.navbar'); // Navigasyon menüsü

    // if (menuIcon) {
    //     menuIcon.onclick = () => {
    //         menuIcon.classList.toggle('bx-x'); // İkonu değiştir (Boxicons için)
    //         navbar.classList.toggle('active'); // Menüyü aç/kapat
    //     };
    // }

    // Eğer formu JavaScript ile göndereceksen (AJAX gibi), buraya form gönderimini yakalama kodunu ekleyebilirsin.
    // const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Form verilerini al ve AJAX isteği ile gönder
    //         alert('Mesajınız gönderildi! (Bu sadece bir örnek)');
    //         this.reset(); // Formu sıfırla
    //     });
    // }

});
// ... (Mevcut main.js kodların burada devam ediyor) ...

// Yeni Chatbot Fonksiyonelliği
const chatbotToggleButton = document.getElementById('chatbot-icon');
const chatbotPopup = document.getElementById('chatbot-popup');
const closeChatbotButton = document.querySelector('.close-chatbot');
const chatbotInputField = document.getElementById('chatbot-input-field');
const chatbotSendButton = document.getElementById('chatbot-send-button');
const chatbotMessages = document.getElementById('chatbot-messages');

// Basit yanıtlar için örnek bir obje
const responses = {
    "merhaba": "Merhaba! Nasıl yardımcı olabilirim?",
    "projeler": "Meryem'in son projelerini görmek için Projelerim bölümüne göz atabilirsiniz.",
    "deneyim": "Meryem'in kariyer geçmişi ve deneyimleri için Deneyim bölümünü ziyaret edin.",
    "iletişim": "Meryem ile iletişime geçmek için iletişim formunu kullanabilir veya 'meriguclu123@gmail.com' adresine e-posta gönderebilirsiniz.",
    "teşekkürler": "Rica ederim! Başka bir sorunuz var mı?",
    "adın ne": "Ben Meryem'in yapay zeka asistanıyım.",
    "nasılsın": "İyiyim, teşekkür ederim! Size nasıl yardımcı olabilirim?",
    "saat kaç": `Şu an saat ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}.`, // Güncel saat için
    "erzurum": "Meryem Atatürk Üniversitesi Bilgisayar Programcılığı mezunu.",
    "varsayılan": "Üzgünüm, ne demek istediğinizi tam anlayamadım. Projeler, iletişim veya deneyim hakkında bilgi alabilirsiniz."
};

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // En alta kaydır
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase().trim();
    if (lowerCaseMessage.includes("merhaba") || lowerCaseMessage.includes("selam")) {
        return responses["merhaba"];
    } else if (lowerCaseMessage.includes("proje") || lowerCaseMessage.includes("çalışma")) {
        return responses["projeler"];
    } else if (lowerCaseMessage.includes("deneyim") || lowerCaseMessage.includes("kariyer")) {
        return responses["deneyim"];
    } else if (lowerCaseMessage.includes("iletişim") || lowerCaseMessage.includes("mail") || lowerCaseMessage.includes("e-posta")) {
        return responses["iletişim"];
    } else if (lowerCaseMessage.includes("teşekkür") || lowerCaseMessage.includes("sağ ol")) {
        return responses["teşekkürler"];
    } else if (lowerCaseMessage.includes("adın ne") || lowerCaseMessage.includes("kimsin")) {
        return responses["adın ne"];
    } else if (lowerCaseMessage.includes("nasılsın")) {
        return responses["nasılsın"];
    } else if (lowerCaseMessage.includes("saat kaç")) {
        return responses["saat kaç"];
    } else if (lowerCaseMessage.includes("erzurum")) {
        return responses["erzurum"];
    }
    else {
        return responses["varsayılan"];
    }
}

// Butona tıklayarak chatbot'u aç/kapat
chatbotToggleButton.addEventListener('click', () => {
    chatbotPopup.classList.toggle('active');
});

// Kapatma butonuna tıklayarak chatbot'u kapat
closeChatbotButton.addEventListener('click', () => {
    chatbotPopup.classList.remove('active');
});

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const userMessage = chatbotInputField.value;
    if (userMessage.trim() === '') return; // Boş mesaj gönderme

    displayMessage(userMessage, 'user');
    chatbotInputField.value = ''; // Input'u temizle

    // Bot yanıtını gecikmeli göster (daha doğal bir etkileşim için)
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        displayMessage(botResponse, 'bot');
    }, 500); // 0.5 saniye sonra yanıtla
}

// Gönder butonuna tıklandığında mesaj gönder
chatbotSendButton.addEventListener('click', sendMessage);

// Enter tuşuna basıldığında mesaj gönder
chatbotInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ... (Mevcut main.js kodların burada biter) ...