// ================== ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ СО СТРАНИЦЫ ==================
const nameEntryScreen = document.getElementById('name-entry-screen');
const nameInput = document.getElementById('player-name-input');
const confirmNameButton = document.getElementById('confirm-name-button');

const gameWorld = document.getElementById('game-world');
const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');
const gameImageElement = document.getElementById('game-image');

const backButton = document.getElementById('back-button');
const pswpElement = document.querySelector('.pswp');


// ================== ИГРОВЫЕ ПЕРЕМЕННЫЕ ==================
let playerName = "Сотрудник";
let score = 0;
let currentSceneName = null;
let sceneHistory = [];


// ================== ЛОГИКА ДЛЯ ПРОСМОТРА ИЗОБРАЖЕНИЙ ==================

// НАШ ГЛАВНЫЙ ПАРАМЕТР 'ТОНКОСТИ' УПРАВЛЕНИЯ.
// Чем он ближе к 1, тем меньше шаг зума.
// 1.1 - очень плавно, 1.2 - средне, 1.4 - быстро.
const ZOOM_STEP_FACTOR = 1.15; 

gameImageElement.addEventListener('click', () => {
    if (!gameImageElement.getAttribute('src')) {
        return;
    }

    // Опции для PhotoSwipe, в которых мы отключаем стандартный зум колесом
    const options = {
        index: 0,
        history: false,
        closeOnScroll: false,
        
        // Полностью отключаем все стандартные механики зума колесом!
        mouseUsed: false, 
        wheelToZoom: false,

        // Оставляем наши настройки для клика/тапа и максимального зума
        maxSpreadZoom: 4,
        getDoubleTapZoom: function(isMouseClick, item) {
            if (item.currZoomLevel > item.initialZoomLevel) {
                return item.initialZoomLevel;
            }
            return item.initialZoomLevel * 2.5;
        }
    };
    
    const items = [{
        src: gameImageElement.src,
        w: gameImageElement.naturalWidth,
        h: gameImageElement.naturalHeight
    }];

    // Создаем галерею
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

    // --- НАША УЛУЧШЕННАЯ ЛОГИКА РУЧНОГО ЗУМА ---

    let wheelHandler; // Переменная для хранения нашей функции

    // 'afterInit' срабатывает, когда галерея создана
    gallery.listen('afterInit', function() {
        const pswp = gallery; // Получаем доступ к объекту галереи

        // Создаем нашу функцию-обработчик
        wheelHandler = function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение

            const isZoomingIn = e.deltaY < 0;
            let currentZoom = pswp.getZoomLevel();
            let newZoom;

            if (isZoomingIn) {
                newZoom = currentZoom * ZOOM_STEP_FACTOR;
            } else {
                newZoom = currentZoom / ZOOM_STEP_FACTOR;
            }
            
            // Плавно зумируем к нужной точке, ориентируясь на положение курсора
            pswp.zoomTo(newZoom, { x: e.clientX, y: e.clientY }, 200);
        };

        // Подключаем наш обработчик к контейнеру галереи
        pswp.framework.container.addEventListener('wheel', wheelHandler, { passive: false });
    });

    // 'destroy' срабатывает, когда галерея закрывается
    gallery.listen('destroy', function() {
        const pswp = gallery;
        // ОБЯЗАТЕЛЬНО удаляем наш обработчик, чтобы не было утечек памяти
        if (wheelHandler && pswp.framework.container) {
            pswp.framework.container.removeEventListener('wheel', wheelHandler);
        }
    });

    // Запускаем галерею
    gallery.init();
});


// ================== ЛОГИКА ЗАПУСКА ИГРЫ ==================
confirmNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        playerName = name;
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
    if (!scene) {
        console.error(`Сцена "${sceneName}" не найдена!`);
        gameTextElement.innerText = `Ошибка: Сцена "${sceneName}" не найдена.`;
        return;
    }
    
    updateBackButtonVisibility();

    if (scene.imageUrl) {
        gameImageElement.src = scene.imageUrl;
        gameImageElement.style.display = 'block';
    } else {
        gameImageElement.src = '';
        gameImageElement.style.display = 'none';
    }

    let sceneText = scene.text.replace(/\[PLAYER_NAME\]/g, playerName);
    gameTextElement.innerText = sceneText;

    gameChoicesElement.innerHTML = '';

    if (scene.type === 'checkbox') {
        renderCheckboxScene(scene);
    } else if (scene.choices) {
        renderStandardScene(scene);
    } else if (scene.next_scene) {
        renderInfoScene(scene);
    }
}

function updateBackButtonVisibility() {
    if (sceneHistory.length > 0) {
        backButton.classList.remove('hidden');
    } else {
        backButton.classList.add('hidden');
    }
}

// Замените эту функцию целиком
function renderStandardScene(scene) {
    scene.choices.forEach(choice => {
        // Если у варианта есть поле "link"
        if (choice.link) {
            const link = document.createElement('a');
            link.href = choice.link;
            link.innerText = choice.text;
            // Атрибуты для безопасности и открытия в новой вкладке
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            gameChoicesElement.appendChild(link);
        } else {
            // Иначе создаем обычную кнопку, как и раньше
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.addEventListener('click', () => renderScene(choice.next_scene));
            gameChoicesElement.appendChild(button);
        }
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
