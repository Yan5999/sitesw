async function getRandomDog() {
    const container = document.getElementById('dogContainer');
    container.innerHTML = 'Завантаження...';

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (data.status === 'success') {
            container.innerHTML = `<img src="${data.message}" alt="Random Dog">`;
        } else {
            container.innerHTML = 'Помилка при отриманні зображення';
        }
    } catch (error) {
        console.error('Помилка:', error);
        container.innerHTML = 'Щось пішло не так';
    }
}

document.getElementById('loadDogBtn').addEventListener('click', getRandomDog);
