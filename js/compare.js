let previousWords = new Set();
document.getElementById('checkBtn').addEventListener('click', () => {
    const input = document
        .getElementById('textInput')
        .value.trim()
        .toLowerCase();
    const words = input.replace(/[.,!?]/g, '').split(/\s+/);
    const currentSet = new Set(words);
    const wordMap = new Map();
    for (let word of currentSet) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }
    const commonWords = [...currentSet].filter((word) =>
        previousWords.has(word)
    );
    const result = document.getElementById('result');
    if (commonWords.length > 0) {
        result.textContent = 'Спільні слова: ' + commonWords.join(', ');
    } else {
        result.textContent = 'Немає спільних слів.';
    }
    previousWords = currentSet;
});
