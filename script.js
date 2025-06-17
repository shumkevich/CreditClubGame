const gameTextElement = document.getElementById('game-text');
const gameChoicesElement = document.getElementById('game-choices');

function renderScene(sceneName) {
    const scene = questData[sceneName];
    if (!scene) {
        console.error(`Сцена "${sceneName}" не найдена!`);
        gameTextElement.innerText = `Ошибка: Сцена "${sceneName}" не найдена. Проверьте файл quest.js.`;
        return;
    }

    gameTextElement.innerText = scene.text;
    gameChoicesElement.innerHTML = '';

    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.addEventListener('click', () => renderScene(choice.next_scene));
            gameChoicesElement.appendChild(button);
        });
    }

    if (scene.next_scene && !scene.choices) {
         const continueButton = document.createElement('button');
         continueButton.innerText = "Продолжить...";
         continueButton.addEventListener('click', () => renderScene(scene.next_scene));
         gameChoicesElement.appendChild(continueButton);
    }
}

renderScene('start');