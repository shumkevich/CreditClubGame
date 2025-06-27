// ================== ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СО СТРАНИЦЫ ==================
const nameEntryScreen = document.getElementById('name-entry-screen');
const nameInput = document.getElementById('player-name-input');
const confirmNameButton = document.getElementById('confirm-name-button');

const gameWorld = document.getElementById('game-world');
const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');
const gameImageElement = document.getElementById('game-image');

const backButtonContainer = document.getElementById('navigation-container'); 
const backButton = document.getElementById('back-button');
const pswpElement = document.querySelector('.pswp');


// ================== ИГРОВЫЕ ПЕРЕМЕННЫЕ ==================
let playerName = "Сотрудник";
let score = 0;
let currentSceneName = null;
let sceneHistory = [];
// --- Переменные для логирования ---
let startTime;
let wrongAnswerCount = 0; // --- НОВЫЙ СЧЕТЧИК ОШИБОК ---


// ================== ЛОГИКА ДЛЯ ПРОСМОТРА ИЗОБРАЖЕНИЙ ==================
const ZOOM_STEP_FACTOR = 1.15; 
gameImageElement.addEventListener('click', () => {
    // ... (этот блок остается без изменений) ...
    if (!gameImageElement.getAttribute('src')) { return; }
    const options = { index: 0, history: false, closeOnScroll: false, mouseUsed: false, wheelToZoom: false, maxSpreadZoom: 4, getDoubleTapZoom: function(isMouseClick, item) { if (item.currZoomLevel > item.initialZoomLevel) { return item.initialZoomLevel; } return item.initialZoomLevel * 2.5; } };
    const items = [{ src: gameImageElement.src, w: gameImageElement.naturalWidth, h: gameImageElement.naturalHeight }];
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    let wheelHandler;
    gallery.listen('afterInit', function() { const pswp = gallery; wheelHandler = function(e) { e.preventDefault(); const isZoomingIn = e.deltaY < 0; let currentZoom = pswp.getZoomLevel(); let newZoom = isZoomingIn ? currentZoom * ZOOM_STEP_FACTOR : currentZoom / ZOOM_STEP_FACTOR; pswp.zoomTo(newZoom, { x: e.clientX, y: e.clientY }, 200); }; pswp.framework.container.addEventListener('wheel', wheelHandler, { passive: false }); });
    gallery.listen('destroy', function() { if (wheelHandler && gallery.framework.container) { gallery.framework.container.removeEventListener('wheel', wheelHandler); } });
    gallery.init();
});


// ================== ЛОГИКА ЗАПУСКА ИГРЫ ==================
confirmNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        playerName = name;
        // Запускаем отсчет и сбрасываем счетчики
        startTime = new Date();
        wrongAnswerCount = 0; // --- СБРОС СЧЕТЧИКА ---

        nameEntryScreen.classList.add('hidden');
        gameWorld.classList.remove('hidden');
        renderScene('start');
    } else {
        alert("Пожалуйста, введите ваше имя.");
    }
});


// ================== ОБРАБОТЧИК КНОПКИ "НАЗАД" ==================
backButton.addEventListener('click', () => {
    if (sceneHistory.length > 0) {
        const previousSceneName = sceneHistory.pop();
        renderScene(previousSceneName, true);
    }
});


// ================== ОСНОВНАЯ ФУНКЦИЯ РЕНДЕРИНГА СЦЕН ==================
function renderScene(sceneName, isGoingBack = false) {
    if (!isGoingBack && currentSceneName) {
        sceneHistory.push(currentSceneName);
    }
    currentSceneName = sceneName;
    const scene = questData[sceneName];
    if (!scene) { console.error(`Сцена "${sceneName}" не найдена!`); gameTextElement.innerText = `Ошибка: Сцена "${sceneName}" не найдена.`; return; }
    updateBackButtonVisibility();
    if (scene.imageUrl) { gameImageElement.src = scene.imageUrl; gameImageElement.style.display = 'block'; } else { gameImageElement.src = ''; gameImageElement.style.display = 'none'; }
    let sceneText = scene.text.replace(/\[PLAYER_NAME\]/g, playerName);
    gameTextElement.innerText = sceneText;
    gameChoicesElement.innerHTML = '';
    if (scene.type === 'checkbox') { renderCheckboxScene(scene); }
    else if (scene.choices) { renderStandardScene(scene); }
    else if (scene.next_scene) { renderInfoScene(scene); }
}

// Вспомогательная функция для перехода
function proceedToNextScene(choice) {
    renderScene(choice.next_scene);
}


function updateBackButtonVisibility() {
    if (sceneHistory.length > 0) { backButtonContainer.classList.remove('hidden'); }
    else { backButtonContainer.classList.add('hidden'); }
}

function renderStandardScene(scene) {
    scene.choices.forEach((choice, index) => {
        if (choice.link) {
            const link = document.createElement('a');
            link.href = choice.link; 
            link.innerText = choice.text;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            link.addEventListener('mousedown', function(e) {
                try {
                    // 1. Считаем время
                    const endTime = new Date();
                    const timeDiff = Math.round((endTime - startTime) / 1000);
                    const minutes = Math.floor(timeDiff / 60);
                    const seconds = timeDiff % 60;
                    const timeStr = `${minutes} мин ${seconds} сек`;
                    
                    // 2. --- НОВЫЙ ФОРМАТ ОТЧЕТА ---
                    const report = {
                        name: playerName,
                        time: timeStr,
                        mistakes: wrongAnswerCount
                    };

                    const reportStr = JSON.stringify(report);
                    const encodedReport = btoa(unescape(encodeURIComponent(reportStr)));

                    const baseMessage = "Добрый день Никита, я прошел свою первую тестовую сделку.";
                    const finalMessage = `${baseMessage}\n\nОтчет:\n${encodedReport}`;
                    
                    e.currentTarget.href = `https://t.me/Shumkov_cc?text=${encodeURIComponent(finalMessage)}`;

                } catch (err) {
                    console.error("Ошибка при формировании отчета:", err);
                }
            });
            gameChoicesElement.appendChild(link);

        } else {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.addEventListener('click', () => {
                // --- Проверяем, является ли выбор ошибочным ---
                // Список "неправильных" сцен, куда ведут ошибочные выборы
                const failScenes = ["block3_fail1", "block3_fail2", "block4_fail", "block7_fail"];
                if (failScenes.includes(choice.next_scene)) {
                    wrongAnswerCount++;
                }
                proceedToNextScene(choice);
            });
            gameChoicesElement.appendChild(button);
        }
    });
}

function renderInfoScene(scene) {
    const button = document.createElement('button');
    button.innerText = "Продолжить";
    button.addEventListener('click', () => proceedToNextScene(scene));
    gameChoicesElement.appendChild(button);
}

function renderCheckboxScene(scene) {
    const form = document.createElement('form');
    scene.choices.forEach((choice, index) => {
        // ... (код создания чекбоксов остается без изменений) ...
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
        
        if (checkedInputs === correctChoices) {
            renderScene(scene.next_scene_success);
        } else {
            // --- Считаем ошибку при неверном ответе в чекбоксах ---
            wrongAnswerCount++;
            renderScene(scene.next_scene_fail);
        }
    });
    form.appendChild(submitButton);
    gameChoicesElement.appendChild(form);
}
