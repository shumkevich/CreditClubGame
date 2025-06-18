// Находим на странице ключевые элементы
const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');
const gameImageElement = document.getElementById('game-image');

// Переменная для хранения счета в викторине
let score = 0;

// ================== ОСНОВНАЯ ФУНКЦИЯ РЕНДЕРИНГА ==================
function renderScene(sceneName) {
    const scene = questData[sceneName];
    if (!scene) {
        console.error(`Сцена "${sceneName}" не найдена!`);
        gameTextElement.innerText = `Ошибка: Сцена "${sceneName}" не найдена. Проверьте quest.js.`;
        return;
    }

    // 1. Обновляем изображение
    if (scene.imageUrl) {
        gameImageElement.src = scene.imageUrl;
        gameImageElement.style.display = 'block';
    } else {
        gameImageElement.style.display = 'none';
    }

    // 2. Обновляем текст (с учетом возможного отображения счета)
    if (scene.type === 'final') {
        gameTextElement.innerText = scene.text.replace('%SCORE%', score);
    } else {
        gameTextElement.innerText = scene.text;
    }
    
    // 3. Очищаем старые кнопки/выборы
    gameChoicesElement.innerHTML = '';

    // 4. Рендерим новый интерфейс в зависимости от типа сцены
    if (scene.type === 'checkbox') {
        renderCheckboxScene(scene);
    } else if (scene.type === 'quiz') {
        renderQuizScene(scene);
    } else if (scene.choices) {
        renderStandardScene(scene);
    } else if (scene.next_scene) {
        renderInfoScene(scene);
    }
}

// ================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ РЕНДЕРИНГА ==================

// Рендеринг стандартной сцены с кнопками выбора
function renderStandardScene(scene) {
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => renderScene(choice.next_scene));
        gameChoicesElement.appendChild(button);
    });
}

// Рендеринг информационной сцены с одной кнопкой "Продолжить"
function renderInfoScene(scene) {
    const button = document.createElement('button');
    button.innerText = "Продолжить";
    button.addEventListener('click', () => renderScene(scene.next_scene));
    gameChoicesElement.appendChild(button);
}

// Рендеринг сцены с чекбоксами
function renderCheckboxScene(scene) {
    const form = document.createElement('form');
    scene.choices.forEach((choice, index) => {
        const div = document.createElement('div');
        div.classList.add('checkbox-container'); // Для стилизации, если понадобится
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `choice-${index}`;
        input.name = choice.text;
        
        const label = document.createElement('label');
        label.htmlFor = `choice-${index}`;
        label.innerText = choice.text;
        
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });
    
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Подтвердить проверку';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем отправку формы
        const checkedInputs = form.querySelectorAll('input:checked');
        const correctChoices = scene.choices.filter(c => c.correct).length;
        
        if (checkedInputs.length === correctChoices) {
            renderScene(scene.next_scene_success);
        } else {
            renderScene(scene.next_scene_fail);
        }
    });
    
    form.appendChild(submitButton);
    gameChoicesElement.appendChild(form);
}

// Рендеринг сцены-викторины
function renderQuizScene(scene) {
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => {
            if (choice.correct) {
                score++;
                // Можно добавить визуальный фидбек, например, alert('Верно!')
            } else {
                // alert('Неверно!')
            }
            renderScene(scene.next_scene);
        });
        gameChoicesElement.appendChild(button);
    });
}

// ================== ЗАПУСК ИГРЫ ==================
renderScene('start');