// Contact form: checks the required fields, shows a clear message under any
// empty or invalid field, then opens the visitor's email app with the message
// already written, addressed to the store's inquiry email.
const STORE_INQUIRY_EMAIL = "hello@examplewebsite142.com";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  function showError(input, errorId, text) {
    document.getElementById(errorId).textContent = text;
    input.setAttribute("aria-invalid", "true");
    input.classList.add("is-invalid-field");
  }

  function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.removeAttribute("aria-invalid");
    input.classList.remove("is-invalid-field");
  }

  // Basic email check: something@something.something
  function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let firstBadField = null;

    if (name === "") {
      showError(nameInput, "nameError", "Please enter your name.");
      firstBadField = firstBadField || nameInput;
    } else {
      clearError(nameInput, "nameError");
    }

    if (email === "") {
      showError(emailInput, "emailError", "Please enter your email address.");
      firstBadField = firstBadField || emailInput;
    } else if (!looksLikeEmail(email)) {
      showError(emailInput, "emailError", "Please enter a valid email address, like name@email.com.");
      firstBadField = firstBadField || emailInput;
    } else {
      clearError(emailInput, "emailError");
    }

    if (message === "") {
      showError(messageInput, "messageError", "Please write your message.");
      firstBadField = firstBadField || messageInput;
    } else {
      clearError(messageInput, "messageError");
    }

    if (firstBadField) {
      status.textContent = "Please fix the fields marked with an error and try again.";
      firstBadField.focus();
      return;
    }

    // Subject is optional, so use a default when it is empty
    const mailSubject = subject || "Inquiry from " + name;
    const mailBody = "Name: " + name + "\r\nEmail: " + email + "\r\n\r\n" + message;

    status.textContent = "Opening your email app. If nothing opens, email us at " + STORE_INQUIRY_EMAIL + ".";

    window.location.href =
      "mailto:" + STORE_INQUIRY_EMAIL +
      "?subject=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(mailBody);
  });
});
