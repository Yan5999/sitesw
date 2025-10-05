// const paragraphs = document.querySelectorAll('p');
// console.log('<p>:', paragraphs.length);

// const h2Elements = document.querySelectorAll('h2');
// console.log('<h2>:', h2Elements.length);

// const bodyBgColor = window.getComputedStyle(document.body).backgroundColor;
// console.log('background-color елементу <body>:', bodyBgColor);

// const h1 = document.querySelector('h1');
// if (h1) {
//     const h1FontSize = window.getComputedStyle(h1).fontSize;
//     console.log('font-size елементу <h1>:', h1FontSize);
// } else {
//     console.log('<h1> немає');
// }
// const allElements = document.querySelectorAll('*');
// allElements.forEach((el) => {
//     let prevColor = '';
//     el.addEventListener('mouseenter', () => {
//         prevColor = el.style.backgroundColor;
//         el.style.backgroundColor = 'red';
//     });
//     el.addEventListener('mouseleave', () => {
//         el.style.backgroundColor = prevColor;
//     });
// });

// setTimeout(() => {
//     let imagesUrl = ['img/trash.png', 'img/eye.png'];

//     let fragment = document.createDocumentFragment();
//     let gallery = document.getElementById('gallery');

//     imagesUrl.forEach((url, index) => {
//         setTimeout(() => {
//             let img = document.createElement('img');
//             img.style.width = '26px';
//             img.style.height = '26px';
//             img.src = url;
//             fragment.appendChild(img);

//             gallery.appendChild(fragment);
//         }, index * 1000);
//     });
// }, 5000);

document.querySelector('button').addEventListener('click', function () {
    const input = document.getElementById('email').value.trim();

    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?\d{10,13}$/;
    const loginPattern = /^[a-zA-Z0-9_-]{3,16}$/;

    if (input.match(emailPattern)) {
        alert('Введено правильний email');
    } else if (input.search(phonePattern) !== -1) {
        alert('Введено правильний номер телефону');
    } else if (input.match(loginPattern)) {
        alert('Введено правильний логін');
    } else {
        alert('Некоректне введення! Перевірте email, телефон або логін.');
    }
});

document.querySelector('button').addEventListener('click', function () {
    let login = document.getElementById('email').value;

    let cleanedLogin = login.replace(/[^a-zA-Z0-9_-]/g, '');

    document.getElementById('email').value = cleanedLogin;

    alert('Очищений логін: ' + cleanedLogin);
});
