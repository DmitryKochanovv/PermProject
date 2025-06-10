fetch('data/quiz.json')
  .then(response => response.json())
  .then(quizData => {
    let currentQuestion = 0;
    const questionElem = document.getElementById('question');
    const answersElem = document.getElementById('answers');

    function renderQuestion() {
      const data = quizData[currentQuestion];
      questionElem.innerHTML = `<h2>${data.question}</h2>`;
      answersElem.innerHTML = '';

      data.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-button');
        button.addEventListener('click', () => checkAnswer(option, button));
        answersElem.appendChild(button);
      });
    }

    function checkAnswer(answer, clickedButton) {
      const correct = quizData[currentQuestion].answer;
      const allButtons = document.querySelectorAll('.answer-button');

      // Отключаем все кнопки
      allButtons.forEach(btn => btn.disabled = true);

      if (answer === correct) {
        clickedButton.classList.add('correct');
      } else {
        clickedButton.classList.add('incorrect');
        // Подсветить правильный ответ
        allButtons.forEach(btn => {
          if (btn.textContent === correct) {
            btn.classList.add('correct');
          }
        });
      }

      // Подождать 1.2 секунды и показать следующий вопрос
      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
          renderQuestion();
        } else {
          questionElem.innerHTML = `<h2>Викторина завершена!</h2>`;
          answersElem.innerHTML = '';
        }
      }, 1200);
    }

    renderQuestion();
  })
  .catch(error => {
    document.getElementById('question').textContent = 'Ошибка загрузки викторины.';
    console.error(error);
  });
