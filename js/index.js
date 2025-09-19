const paragraphs = document.querySelectorAll('p');
console.log('<p>:', paragraphs.length);

const h2Elements = document.querySelectorAll('h2');
console.log('<h2>:', h2Elements.length);

const bodyBgColor = window.getComputedStyle(document.body).backgroundColor;
console.log('background-color елементу <body>:', bodyBgColor);

const h1 = document.querySelector('h1');
if (h1) {
    const h1FontSize = window.getComputedStyle(h1).fontSize;
    console.log('font-size елементу <h1>:', h1FontSize);
} else {
    console.log('<h1> немає');
}
