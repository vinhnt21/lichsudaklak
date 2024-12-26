document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.querySelector(".feedback-form");

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("feedback-subtitle").innerText =
      "Thank you for your feedback!";

    setTimeout(() => {
      document.getElementById("feedback-subtitle").innerText =
        "We value your thoughts and suggestions to improve our content and user experience!";
    }, 3000);

    this.reset();
  });
});
