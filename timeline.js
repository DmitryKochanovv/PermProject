fetch('data/events.json')
  .then(response => response.json())
  .then(events => {
    let index = 0;
    const container = document.getElementById('event-block');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    function render() {
      // Показываем финальный экран
      if (index === events.length) {
        container.innerHTML = `
          <h2>Вы прошли всю историю Перми!</h2>
          <p>Готовы проверить свои знания?</p>
          <button onclick="location.href='quiz.html'" style="
            padding: 12px 24px;
            font-size: 18px;
            margin-top: 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          ">Перейти к викторине</button>
        `;
        nextBtn.disabled = true;
        prevBtn.disabled = false;
        return;
      }

      const event = events[index];
      container.innerHTML = `
        <h2>${event.year} — ${event.title}</h2>
        <img src="${event.image}" alt="${event.title}">
        <p>${event.description}</p>
        <a href="${event.source}" target="_blank">Подробнее об этом</a>
      `;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = false; // всегда активна, пока не дошли до quiz
    }

    prevBtn.addEventListener('click', () => {
      if (index > 0) {
        index--;
        render();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (index <= events.length) {
        index++;
        render();
      }
    });

    render();
  })
  .catch(err => {
    document.getElementById('event-block').innerHTML = '<p>Ошибка загрузки данных</p>';
    console.error(err);
  });
