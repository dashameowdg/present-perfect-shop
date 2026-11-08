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
});
