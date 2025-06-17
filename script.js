// Находим на странице места для текста и кнопок
const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');

// Функция, которая отрисовывает сцену
function renderScene(sceneName) {
    // Находим нужную сцену в нашей "базе данных" questData
    const scene = questData[sceneName];

    if (!scene) {
        console.error(`Сцена "${sceneName}" не найдена!`);
        return;
    }

    // Вставляем текст сцены на страницу
    gameTextElement.innerText = scene.text;

    // Очищаем старые кнопки
    gameChoicesElement.innerHTML = '';

    // Если в сцене есть выборы, создаем для них кнопки
    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            // При клике на кнопку, вызываем эту же функцию, но уже для следующей сцены
            button.addEventListener('click', () => renderScene(choice.next_scene));
            gameChoicesElement.appendChild(button);
        });
    }

    // Если выборов нет, а есть просто переход на следующую сцену
    if (scene.next_scene && !scene.choices) {
         // Можно добавить кнопку "Продолжить"
         const continueButton = document.createElement('button');
         continueButton.innerText = "Продолжить...";
         continueButton.addEventListener('click', () => renderScene(scene.next_scene));
         gameChoicesElement.appendChild(continueButton);
    }
}

// Запускаем игру с самой первой сцены
renderScene('start');