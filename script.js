// Ждем, пока вся страница полностью загрузится
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // БАЗОВЫЕ ДАННЫЕ ДЛЯ ВИКТОРИНЫ (ВОПРОСЫ И ВАРИАНТЫ ОТВЕТОВ)
    // ==========================================================================
    const quizData = [
        {
            question: "Кому вы выбираете подарок?",
            options: [
                { text: "Второй половинке (романтичный)", weight: "love" },
                { text: "Другу или коллеге (практичный/веселый)", weight: "friend" },
                { text: "Родителям или близким (уютный)", weight: "family" }
            ]
        },
        {
            question: "Каковы увлечения этого человека?",
            options: [
                { text: "Любит отдых дома, книги и тепло", weight: "home" },
                { text: "Постоянно в движении, ищет эмоции", weight: "active" },
                { text: "Обожает красивые вещи и стиль", weight: "style" }
            ]
        }
    ];

    // База готовых рекомендаций в зависимости от комбинаций ответов
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

    // Переменные для отслеживания текущего состояния
    let currentQuestionIndex = 0;
    let selectedWeights = []; // Сюда будем сохранять категории ответов

    // Находим элементы HTML, которыми будем управлять
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const quizResult = document.getElementById("quiz-result");
    const restartBtn = document.getElementById("restart-btn");

    // ==========================================================================
    // ФУНКЦИИ ДЛЯ РАБОТЫ ВИКТОРИНЫ
    // ==========================================================================

    // Функция для отображения текущего вопроса
    function loadQuestion() {
        // Очищаем старые кнопки с ответами
        optionsContainer.innerHTML = "";

        // Проверяем, есть ли еще вопросы
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            
            // Меняем текст вопроса на странице
            questionText.textContent = currentQuestion.question;

            // Создаем кнопки для каждого варианта ответа
            currentQuestion.options.forEach(option => {
                const button = document.createElement("button");
                button.classList.add("quiz-btn");
                button.textContent = option.text;
                
                // Навешиваем событие клика на кнопку ответа
                button.addEventListener("click", () => handleAnswer(option.weight));
                
                // Добавляем кнопку на страницу
                optionsContainer.appendChild(button);
            });
        } else {
            // Если вопросы кончились — показываем результат
            showResult();
        }
    }

    // Функция обработки выбора ответа
    function handleAnswer(weight) {
        selectedWeights.push(weight); // Запоминаем выбор пользователя
        currentQuestionIndex++; // Переходим к следующему вопросу
        loadQuestion(); // Перерисовываем экран
    }

    // Функция расчета и вывода результата
    function showResult() {
        // Скрываем блок с вопросами
        questionContainer.classList.add("hidden");
        // Показываем блок с результатом
        resultContainer.classList.remove("hidden");

        // Составляем ключ (например: "love-home")
        const resultKey = `${selectedWeights[0]}-${selectedWeights[1]}`;
        
        // Берем подарок из базы или ставим стандартный, если что-то пошло не так
        const finalGift = recommendations[resultKey] || "Универсальный подарочный сертификат 🎁";

        // Записываем результат на страницу
        quizResult.textContent = finalGift;
    }

    // Функция сброса викторины (Пройти заново)
    function restartQuiz() {
        currentQuestionIndex = 0;
        selectedWeights = [];
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        loadQuestion();
    }

    // Навешиваем клик на кнопку "Пройти заново"
    restartBtn.addEventListener("click", restartQuiz);

    // Запускаем первый вопрос при загрузке страницы
    loadQuestion();
});
