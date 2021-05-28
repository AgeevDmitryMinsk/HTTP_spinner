const form = document.forms.search;
const content = document.querySelector('.content');
const result = document.querySelector('.content__result');
const error = document.querySelector('.content__error');
const spinner = document.querySelector('.spinner');

  //2- Запрос должен уходить на сервер при нажатии на кнопку. Мы уже создали обработчик кнопки, ваша задача:
  // внутри обработчика вызвать функцию search с двумя аргументами: значениями полей entity и entityId;
  // повесить функции search обработчик then: в нём нужно проверить свойство ok объекта ответа. Если res.ok — true выведите в консоль сообщение: «Всё хорошо».
  //4-	в первом обработчике then удалите console.log, и вместо этого верните res.json(). Если ответ успешный, следующий обработчик then получит объект ответа на вход;
  // 	если с ответом что-то не так, отклоните промис. Для этого верните Promise.reject с кодом статуса ответа;
  // 	добавьте ещё один обработчик then. Параметр его колбэка можно тоже назвать res, так как у каждого из then отдельная область видимости;
  // 	во втором then выведите в консоль полученный объект res, чтобы его изучить.
  // 	добавьте блок catch, внутри которого выведите в консоль сообщение: Ошибка: ${err}.
form.addEventListener('submit', function submit(e) {
  e.preventDefault(); // Чтобы перезагрузки всей страницы не происходило, мы отменяли это стандартное поведение формы.
                      //Таким обазом происходит обновление только части страницы после нажатия кнопки `submit`
    renderLoading(true)
  search(form.elements.entity.value, form.elements.entityId.value)
      .then((res) => {
        if (res.ok) return res.json()
        else return Promise.reject(res.status);
      })
      //.then((res) => {return console.log(res.name) })
      .then((res) => {console.log(res.name)
          renderResult(res.name) })
      .catch((err)=> renderError(`Ошибка: ${err}`))//console.log(`Ошибка: ${err}`))
      .finally(()=> renderLoading(false))

});



//1- После объявления переменных создайте функцию search. Должна принимать на вход два параметра: entity и entityId,
// и генерировать fetch-запрос такого вида:
// https://swapi.nomoreparties.co/entity/entityId
// Шаблонной строкой вставьте entity и entityId в URL запроса.
// Также, search должна возвращать промис — результат работы этого запроса.


function search(entity, entityId) {
  return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}`)
}

//3-Запросы отправляются, пришло время отобразить результат. Для этого мы подготовили два элемента: content__result
// и content__error. В первый нужно выводить результат, если данные пришли и всё хорошо. Во второй — ошибку, если что-то пошло не так.
// Когда результат показан, ошибка должна быть сброшена. И наоборот.
// Для этого: // ниже кода функции search создайте функцию renderResult с параметром text;
// в теле функции renderResult запишите в свойство textContent переменной result полученный параметр text;
// в теле функции renderResult установите в свойство textContent переменной error пустую строку (это сбросит ошибку,
// если она была, когда мы хотим показать результат).
// После всего этого под renderResult создайте аналогичную функцию renderError. Она должна принимать параметр err,
// устанавливать его в textContent ошибки, а результат, наоборот, сбрасывать.
function renderResult(text) {
  result.textContent = text;
  error.textContent = ''
}

function renderError(err) {
  result.textContent = '';
  error.textContent = err
}

// 6 - Будем показывать его пока идёт загрузка и скрывать, когда ответ получен. Для этого:
// создайте функцию renderLoading с одним параметром isLoading;
// если isLoading равен true, элементу spinner нужно добавить класс spinner_visible, а элементу content — класс content_hidden (это нужно, чтобы скрыть этот блок пока идёт загрузка);
// иначе, если isLoading — false, нужно убрать два класса:
// content_hidden у элемента content;
// spinner_visible у элемента spinner.
function renderLoading(isLoading){
    if(isLoading) {spinner.classList.add('spinner_visible');
        content.classList.add('content_hidden')}
    else {spinner.classList.remove('spinner_visible');
        content.classList.remove('content_hidden')
    }
}