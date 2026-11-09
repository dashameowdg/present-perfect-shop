document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. КНОПКА НАВЕРХ (Задание 1)
    // ==========================================================================
    const scrollTopBtn = document.getElementById("scroll-to-top");
    
    window.addEventListener("scroll", () => {
        // Если прокрутили больше 400px — показываем кнопку, иначе — скрываем
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show"); // Исправлено здесь!
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    // ==========================================================================
    // 3. АНИМАЦИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ (Задание 3)
    // ==========================================================================
    const animateItems = document.querySelectorAll(".scroll-animate");
    const checkScroll = () => {
        animateItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.85) {
                item.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Запуск один раз при старте

    // ==========================================================================
    // 4 & 7. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА С LOCALSTORAGE (Задание 4, 7)
    // ==========================================================================
    const langToggleBtn = document.getElementById("lang-toggle");
    // Читаем язык из хранилища или ставим "ru" по умолчанию
    let currentLang = localStorage.getItem("siteLang") || "ru";

    const updateLanguageUI = (lang) => {
        const textElements = document.querySelectorAll("[data-lang-ru]");
        textElements.forEach(el => {
            el.textContent = el.getAttribute(`data-lang-${lang}`);
        });
        
        const placeholders = document.querySelectorAll("[data-lang-placeholder-ru]");
        placeholders.forEach(el => {
            el.setAttribute("placeholder", el.getAttribute(`data-lang-placeholder-${lang}`));
        });

        langToggleBtn.textContent = lang === "ru" ? "🇬🇧 EN" : "🇷🇺 RU";
    };

    langToggleBtn.addEventListener("click", () => {
        currentLang = currentLang === "ru" ? "en" : "ru";
        localStorage.setItem("siteLang", currentLang); // Сохраняем выбор
        updateLanguageUI(currentLang);
    });
    updateLanguageUI(currentLang); // Применяем язык при загрузке

    // ==========================================================================
    // 8. ЖИВОЙ ФИЛЬТР/ПОИСК ПО КАТАЛОГУ (Задание 8)
    // ==========================================================================
    const searchInput = document.getElementById("catalog-search");
    const productCards = document.querySelectorAll(".product-card");

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase().trim();
        productCards.forEach(card => {
            const title = card.getAttribute("data-title");
            if (title.includes(value)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });

    // ==========================================================================
    // 9. СЛАЙДЕР БЕЗ БИБЛИОТЕК (Задание 9)
    // ==========================================================================
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide-item");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    let slideIndex = 0;

    const updateSlider = () => {
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    };

    nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // ==========================================================================
    // 10. МОДАЛЬНОЕ ОКНО С ДЕТАЛЯМИ (Задание 10)
    // ==========================================================================
    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeModalBtn = document.querySelector(".close-modal-btn");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");

    const modalData = {
        cozy: { title: "Набор 'Уютный вечер'", desc: "Внутри: Ароматические свечи, кружка ручной работы, зефирки и натуральный премиум-какао. Идеально для зимних вечеров!" },
        active: { title: "Сертификат на полет", desc: "Экстремальный полет на воздушном шаре или свидание на крыше небоскреба. Эмоции, которые запомнятся навсегда!" },
        style: { title: "Именной термостакан", desc: "Качественная нержавеющая сталь, двойные стенки, удерживающие тепло до 12 часов, и индивидуальная гравировка любого имени!" }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const giftKey = btn.getAttribute("data-gift");
            modalTitle.textContent = modalData[giftKey].title;
            modalDesc.textContent = modalData[giftKey].desc;
            modal.style.display = "flex";
        });
    });

    closeModalBtn.addEventListener("click", () => { modal.style.display = "none"; });
    window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

    // ==========================================================================
    // КОД ДЛЯ ВИКТОРИНЫ (КВИЗА)
    // ==========================================================================
    const quizData = [
        {
            question: "Кому вы выбираете подарок?",
            options: [
                { text: "Второй половинке 💝", weight: "love" },
                { text: "Другу или коллеге 👾", weight: "friend" },
                { text: "Родителям или близким 🏡", weight: "family" }
            ]
        },
        {
            question: "Каковы увлечения этого человека?",
            options: [
                { text: "Любит отдых дома, плед и тепло ☕", weight: "home" },
                { text: "Ищет приключения и эмоции 🚀", weight: "active" },
                { text: "Обожает красивые вещи и стиль ✨", weight: "style" }
            ]
        }
    ];

    const recommendations = {
        "love-home": "Набор 'Уютный вечер' (свечи, плед, какао) 💝",
        "love-active": "Сертификат на полет на воздушном шаре или свидание на крыше 🚀",
        "love-style": "Именной кулон с гравировкой или стильный парфюм ✨",
        "friend-home": "Настольная игра для больших компаний или термостакан 🧩",
        "friend-active": "Билет на картинг или квест-комнату 🏎️",
        "friend-style": "Оригинальный органайзер для рабочего стола или беспроводная колонка 🎵",
        "family-home": "Массажер для шеи или набор элитного чая/кофе ☕",
        "family-active": "Семейная фотосессия за городом или экскурсия 📸",
        "family-style": "Шерстяной плед ручной работы или интерьерная ваза 🏺"
    };

    let currentQuestionIndex = 0;
    let selectedWeights = [];

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const quizResult = document.getElementById("quiz-result");
    const restartBtn = document.getElementById("restart-btn");

    function loadQuestion() {
        optionsContainer.innerHTML = "";
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;

            currentQuestion.options.forEach(option => {
                const button = document.createElement("button");
                button.classList.add("quiz-btn");
                button.textContent = option.text;
                button.addEventListener("click", () => handleAnswer(option.weight));
                optionsContainer.appendChild(button);
            });
        } else {
            showResult();
        }
    }

    function handleAnswer(weight) {
        selectedWeights.push(weight);
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        const resultKey = `${selectedWeights[0]}-${selectedWeights[1]}`;
        quizResult.textContent = recommendations[resultKey] || "Универсальный подарочный сертификат 🎁";
    }

    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        selectedWeights = [];
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        loadQuestion();
    });

    loadQuestion();

        // ==========================================================================
    // ПАНЕЛЬ ДОСТУПНОСТИ: ШРИФТЫ, СКРИНРИДЕР И УПРАВЛЕНИЕ СТРЕЛОЧКАМИ
    // ==========================================================================
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsPanel = document.getElementById("settings-panel");
    const fontDecrease = document.getElementById("font-decrease");
    const fontIncrease = document.getElementById("font-increase");
    const readerToggle = document.getElementById("reader-toggle");

    // Текущий размер шрифта (в процентах от стандартного)
    let currentFontSize = 100;
    // Флаг работы скринридера
    let isReaderActive = false;
    // Массив элементов для чтения на странице и индекс текущего
    let readableElements = [];
    let currentReaderIndex = -1;

    // 1. Открытие/закрытие панели настроек по клику на шестерёнку
    settingsToggle.addEventListener("click", () => {
        settingsPanel.classList.toggle("open");
    });

    // 2. Изменение размера шрифта
    fontIncrease.addEventListener("click", () => {
        if (currentFontSize < 140) { // Ограничение максимума
            currentFontSize += 10;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    fontDecrease.addEventListener("click", () => {
        if (currentFontSize > 80) { // Ограничение минимума
            currentFontSize -= 10;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    // 3. Логика Скринридера (Озвучка стрелочками)
    // Функция сбора всех текстовых блоков на странице, которые стоит озвучить
    function updateReadableElements() {
        readableElements = Array.from(document.querySelectorAll("h1, h2, h3, p, .quiz-btn, .slide-item"));
    }

    // Функция озвучивания текста
    function speakText(text) {
        // Останавливаем старую озвучку, если она идёт
        window.speechSynthesis.cancel();
        
        if (!text) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        // Автоматически определяем язык озвучки на основе нашего переключателя языков
        utterance.lang = currentLang === "ru" ? "ru-RU" : "en-US";
        window.speechSynthesis.speak(utterance);
    }

    // Включение / Выключение скринридера кнопкой
    readerToggle.addEventListener("click", () => {
        isReaderActive = !isReaderActive;
        
        if (isReaderActive) {
            readerToggle.classList.remove("btn-off");
            readerToggle.classList.add("btn-on");
            readerToggle.setAttribute("data-lang-ru", "Вкл");
            readerToggle.setAttribute("data-lang-en", "On");
            readerToggle.textContent = currentLang === "ru" ? "Вкл" : "On";
            
            updateReadableElements();
            currentReaderIndex = -1;
            speakText(currentLang === "ru" ? "Режим чтения включен. Используйте стрелочки вверх и вниз." : "Reader mode activated. Use up and down arrows.");
        } else {
            readerToggle.classList.remove("btn-on");
            readerToggle.classList.add("btn-off");
            readerToggle.setAttribute("data-lang-ru", "Выкл");
            readerToggle.setAttribute("data-lang-en", "Off");
            readerToggle.textContent = currentLang === "ru" ? "Выкл" : "Off";
            
            // Сбрасываем подсветку и останавливаем голос
            window.speechSynthesis.cancel();
            if (readableElements[currentReaderIndex]) {
                readableElements[currentReaderIndex].classList.remove("reader-highlight");
            }
            currentReaderIndex = -1;
        }
    });

    // Перехват нажатия клавиш-стрелочек
    window.addEventListener("keydown", (event) => {
        if (!isReaderActive || readableElements.length === 0) return;

        // Нажатие СТРЕЛОЧКИ ВНИЗ (переход к следующему тексту)
        if (event.key === "ArrowDown") {
            event.preventDefault(); // Запрещаем стандартный скролл страницы клавишей
            
            // Убираем старую подсветку
            if (readableElements[currentReaderIndex]) {
                readableElements[currentReaderIndex].classList.remove("reader-highlight");
            }

            currentReaderIndex++;
            if (currentReaderIndex >= readableElements.length) {
                currentReaderIndex = 0; // Зацикливаем в начало
            }

            // Добавляем новую подсветку и плавно докручиваем экран до элемента
            const currentEl = readableElements[currentReaderIndex];
            currentEl.classList.add("reader-highlight");
            currentEl.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Читаем текст
            speakText(currentEl.textContent);
        }

        // Нажатие СТРЕЛОЧКИ ВВЕРХ (переход к предыдущему тексту)
        if (event.key === "ArrowUp") {
            event.preventDefault();
            
            if (readableElements[currentReaderIndex]) {
                readableElements[currentReaderIndex].classList.remove("reader-highlight");
            }

            currentReaderIndex--;
            if (currentReaderIndex < 0) {
                currentReaderIndex = readableElements.length - 1; // Зацикливаем в конец
            }

            const currentEl = readableElements[currentReaderIndex];
            currentEl.classList.add("reader-highlight");
            currentEl.scrollIntoView({ behavior: "smooth", block: "center" });
            
            speakText(currentEl.textContent);
        }
    });

        // ==========================================================================
    // НАСТРОЙКА РАБОТЫ ФОРМЫ ПОД NETLIFY FORMS (БЕЗ ПЕРЕХОДА НА 404)
    // ==========================================================================
    const form = document.querySelector(".gifts-contact"); // Используем имя нашей формы
    const formStatus = document.getElementById("form-status");

    // Если форма не нашлась по классу, попробуем найти её по тегу form
    const contactForm = form || document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Блокируем стандартную перезагрузку и уход на страницу 404
            event.preventDefault(); 
            
            // Собираем данные формы
            const myForm = event.target;
            const formData = new FormData(myForm);
            
            // Показываем статус отправки
            formStatus.style.color = "#2d3142";
            formStatus.textContent = currentLang === "ru" ? "Отправка письма... 🚀" : "Sending letter... 🚀";

            // Отправляем данные на сервера Netlify в фоновом режиме
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Если всё ушло успешно — выводим красивый текст прямо на странице
                formStatus.style.color = "#2ed573";
                formStatus.textContent = currentLang === "ru" 
                    ? "Спасибо! Ваше письмо успешно улетело! 🎁" 
                    : "Thank you! Your letter has been sent! 🎁";
                myForm.reset(); // Очищаем поля формы
            })
            .catch((error) => {
                // Если произошла ошибка сети
                formStatus.style.color = "#ff4757";
                formStatus.textContent = currentLang === "ru" 
                    ? "Ой! Ошибка соединения. Проверьте интернет." 
                    : "Oops! Connection error. Check your internet.";
            });
        });
    }

});
