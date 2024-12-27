class Quiz {
  constructor(category) {
    this.category = category;
    this.questions = quizData[category];
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.answeredQuestions = new Set();
    this.startTime = new Date();
    
    this.initializeQuiz();
  }

  retry() {
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.answeredQuestions.clear();
    this.startTime = new Date();
    
    document.getElementById("results").classList.add("d-none");
    document.getElementById("quizContent").classList.remove("d-none");
    document.getElementById("progressBar").style.width = "0%";
    
    this.updateQuestion();
    this.updateProgress();
  }

  showResults() {
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - this.startTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    const answeredQuestions = this.answeredQuestions.size;
    const correctAnswers = this.score;
    const wrongAnswers = answeredQuestions - correctAnswers;
    const percentage = answeredQuestions > 0 
      ? Math.round((correctAnswers / answeredQuestions) * 100) 
      : 0;

    document.getElementById("quizContent").classList.add("d-none");
    document.getElementById("results").classList.remove("d-none");

    document.getElementById("correctAnswers").textContent = correctAnswers;
    document.getElementById("wrongAnswers").textContent = wrongAnswers;
    document.getElementById("percentage").textContent = percentage;
    document.getElementById("timeSpent").textContent = 
      `${minutes} phút ${seconds} giây`;
  }

  getCategoryTitle() {
    const titles = {
      french: "Kháng chiến chống Pháp",
      american: "Kháng chiến chống Mỹ",
      battles: "Những trận đánh nổi tiếng",
      figures: "Các nhân vật lịch sử",
    };
    return titles[this.category];
  }

  initializeQuiz() {
    document.getElementById("quizTitle").textContent = this.getCategoryTitle();
    
    this.updateQuestion();
    this.updateProgress();

    document
      .getElementById("prevBtn")
      .addEventListener("click", () => this.previousQuestion());
    document
      .getElementById("nextBtn")
      .addEventListener("click", () => this.nextQuestion());
    document
      .getElementById("retryBtn")
      .addEventListener("click", () => this.retry());
    document
      .getElementById("homeBtn")
      .addEventListener("click", () => this.goHome());
  }

  updateQuestion() {
    const question = this.questions[this.currentQuestion];
    document.getElementById("question").textContent = question.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "btn option-btn";
      button.textContent = option;

      if (this.answeredQuestions.has(this.currentQuestion)) {
        button.disabled = true;
        if (option === question.answer) {
          button.classList.add("correct");
          button.innerHTML = `${option} <i class="fas fa-check"></i>`;
        } else if (option === this.userAnswers[this.currentQuestion]) {
          button.classList.add("incorrect");
          button.innerHTML = `${option} <i class="fas fa-times"></i>`;
        }
      } else {
        button.addEventListener("click", () => this.selectAnswer(option));
      }

      optionsContainer.appendChild(button);
    });

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.disabled = this.currentQuestion === 0;
    nextBtn.textContent =
      this.currentQuestion === this.questions.length - 1
        ? "Kết thúc"
        : "Tiếp theo";
    nextBtn.disabled = !this.answeredQuestions.has(this.currentQuestion);
  }

  selectAnswer(selectedOption) {
    if (this.answeredQuestions.has(this.currentQuestion)) return;

    const question = this.questions[this.currentQuestion];
    this.userAnswers[this.currentQuestion] = selectedOption;
    this.answeredQuestions.add(this.currentQuestion);

    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.textContent === question.answer) {
        button.classList.add("correct");
        button.innerHTML = `${button.textContent} <i class="fas fa-check"></i>`;
      } else if (
        button.textContent === selectedOption &&
        selectedOption !== question.answer
      ) {
        button.classList.add("incorrect");
        button.innerHTML = `${button.textContent} <i class="fas fa-times"></i>`;
      }
    });

    if (selectedOption === question.answer) {
      this.score++;
    }

    document.getElementById("nextBtn").disabled = false;
  }

  updateProgress() {
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    document.getElementById("progressBar").style.width = `${progress}%`;
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.updateQuestion();
      this.updateProgress();
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.updateQuestion();
      this.updateProgress();
    } else {
      this.showResults();
    }
  }

  goHome() {
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.answeredQuestions.clear();
    this.startTime = new Date();
    
    document.getElementById("results").classList.add("d-none");
    document.getElementById("quizContent").classList.add("d-none");
    document.querySelector(".quiz-container .row").classList.remove("d-none");
    
    document.getElementById("progressBar").style.width = "0%";
    
    window.currentQuiz = null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadQuizData();
  document.querySelectorAll(".quiz-category").forEach((category) => {
    category.addEventListener("click", () => {
      const categoryType = category.dataset.category;
      
      if (window.currentQuiz) {
        window.currentQuiz = null;
      }
      
      document.querySelector(".quiz-container .row").classList.add("d-none");
      document.getElementById("quizContent").classList.remove("d-none");
      window.currentQuiz = new Quiz(categoryType);
    });
  });
});

// Thêm các biến để theo dõi thời gian
let timerInterval;
let seconds = 0;

// Hàm định dạng thời gian
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Hàm bắt đầu đếm thời gian
function startTimer() {
  console.log('startTimer called');
  timerInterval = setInterval(() => {
    seconds++;
    const timeString = formatTime(seconds);
    document.getElementById('timeLeft').textContent = timeString;
    console.log('Current time:', timeString);
  }, 1000);
}

// Hàm dừng đếm thời gian
function stopTimer() {
  clearInterval(timerInterval);
  return formatTime(seconds);
}

// Sửa đổi hàm bắt đầu quiz để khởi động đồng hồ
function startQuiz(category) {
  currentCategory = category;
  loadQuestions(category);
  
  // Reset và bắt đầu đồng hồ
  seconds = 0;
  if (timerInterval) {
      clearInterval(timerInterval); // Xóa interval cũ nếu có
  }
  document.getElementById('timeLeft').textContent = '00:00';
  startTimer();
  
  // Hiển thị quiz
  document.querySelector('.quiz-container .row').classList.add('d-none');
  document.getElementById('quizContent').classList.remove('d-none');
  
  // Log để debug
  console.log('Timer started');
}

// Sửa đổi hàm kết thúc quiz để dừng đồng hồ
function showResults() {
  const timeSpent = stopTimer(); // Dừng đồng hồ và lấy thời gian
  // ... code hiện tại ...
  document.getElementById('timeSpent').textContent = timeSpent;
  // ... code hiện tại ...
}

// Sửa đổi hàm retry để reset đồng hồ
document.getElementById('retryBtn').addEventListener('click', () => {
  seconds = 0;
  document.getElementById('timeLeft').textContent = '00:00';
  startQuiz(currentCategory);
});

// Thêm event listener cho các nút "Bắt đầu"
document.querySelectorAll('.start-quiz').forEach(button => {
  button.addEventListener('click', function() {
      const category = this.closest('.quiz-category').dataset.category;
      startQuiz(category);
      // Kiểm tra xem đồng hồ có chạy không
      console.log('Bắt đầu quiz với category:', category);
  });
});