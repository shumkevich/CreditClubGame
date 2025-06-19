// ================== ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СО СТРАНИЦЫ ==================
// Элементы стартового экрана
const nameEntryScreen = document.getElementById('name-entry-screen');
const nameInput = document.getElementById('player-name-input');
const confirmNameButton = document.getElementById('confirm-name-button');

// Элементы основного игрового экрана
const gameWorld = document.getElementById('game-world');
const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');
const gameImageElement = document.getElementById('game-image');


// ================== ИГРОВЫЕ ПЕРЕМЕННЫЕ ==================
let playerName = "Сотрудник"; // Имя по умолчанию
let score = 0;


// ================== ЛОГИКА ЗАПУСКА ИГРЫ ==================
confirmNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim(); // .trim() убирает случайные пробелы
    if (name) {
        playerName = name;
        nameEntryScreen.classList.add('hidden');
        gameWorld.classList.remove('hidden');
        renderScene('start');
    } else {
        alert("Пожалуйста, введите ваше имя.");
    }
});


// ================== ОСНОВНАЯ ФУНКЦИЯ РЕНДЕРИНГА СЦЕН ==================
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

    // 2. Обновляем текст, ПОДСТАВЛЯЯ ИМЯ ИГРОКА
    let sceneText = scene.text.replace(/\[PLAYER_NAME\]/g, playerName);
    if (scene.type === 'final') {
        sceneText = sceneText.replace('%SCORE%', score);
    }
    gameTextElement.innerText = sceneText;
    
    // 3. Очищаем старые кнопки
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

// ... (остальные функции рендеринга остаются без изменений, просто скопируйте их отсюда)

function renderStandardScene(scene) {
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => renderScene(choice.next_scene));
        gameChoicesElement.appendChild(button);
    });
}

function renderInfoScene(scene) {
    const button = document.createElement('button');
    button.innerText = "Продолжить";
    button.addEventListener('click', () => renderScene(scene.next_scene));
    gameChoicesElement.appendChild(button);
}

function renderCheckboxScene(scene) {
    const form = document.createElement('form');
    scene.choices.forEach((choice, index) => {
        const div = document.createElement('div');
        div.className = 'checkbox-container';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `choice-${index}`;
        const label = document.createElement('label');
        label.htmlFor = `choice-${index}`;
        label.innerText = choice.text;
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Подтвердить проверку';
    submitButton.type = 'submit';
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkedInputs = form.querySelectorAll('input:checked').length;
        const correctChoices = scene.choices.filter(c => c.correct).length;
        renderScene(checkedInputs === correctChoices ? scene.next_scene_success : scene.next_scene_fail);
    });
    form.appendChild(submitButton);
    gameChoicesElement.appendChild(form);
}

function renderQuizScene(scene) {
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.addEventListener('click', () => {
            if (choice.correct) score++;
            renderScene(scene.next_scene);
        });
        gameChoicesElement.appendChild(button);
    });
}