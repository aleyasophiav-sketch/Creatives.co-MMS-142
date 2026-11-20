const TO_ADDRESS = "orders@examplewebsite142.com";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("order-details");
  const status = document.getElementById("formStatus");

  const productInput = document.getElementById("product-name");
  const sizeInput = document.getElementById("size");
  const quantityInput = document.getElementById("quantity");
  const nameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("street-address");

  function showError(input, errorId, text) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = text;
    errorEl.classList.add("active");
    input.setAttribute("aria-invalid", "true");
    input.classList.add("invalid");
  }

  function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = "";
    errorEl.classList.remove("active");
    input.removeAttribute("aria-invalid");
    input.classList.remove("invalid");
  }

  // Basic email check: something@something.something
  function looksLikeEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";

    const product = productInput.value.trim();
    const size = sizeInput.value.trim();
    const quantity = quantityInput.value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();

    let firstBadField = null;

    if (size === "") {
      showError(sizeInput, "size-error", "Please select a shirt size.");
      firstBadField = firstBadField || sizeInput;
    } else {
      clearError(sizeInput, "size-error");
    }

    if (quantity === "") {
      showError(quantityInput, "quantity-error", "Please enter a quantity.");
      firstBadField = firstBadField || quantityInput;
    } else if (Number(quantity) < 1) {
      showError(quantityInput, "quantity-error", "Quantity must be at least 1.");
      firstBadField = firstBadField || quantityInput;
    } else {
      clearError(quantityInput, "quantity-error");
    }

    if (name === "") {
      showError(nameInput, "name-error", "Please enter your full name.");
      firstBadField = firstBadField || nameInput;
    } else {
      clearError(nameInput, "name-error");
    }

    if (email === "") {
      showError(emailInput, "email-error", "Please enter your email address.");
      firstBadField = firstBadField || emailInput;
    } else if (!looksLikeEmail(email)) {
      showError(emailInput, "email-error", "Please enter a valid email address, like name@email.com.");
      firstBadField = firstBadField || emailInput;
    } else {
      clearError(emailInput, "email-error");
    }

    if (address === "") {
      showError(addressInput, "address-error", "Please enter your address.");
      firstBadField = firstBadField || addressInput;
    } else {
      clearError(addressInput, "address-error");
    }

    if (firstBadField) {
      status.textContent = "Please fix the fields marked with an error and try again.";
      firstBadField.focus();
      return;
    }

    const subject = "New Order: " + product;
    const body =
      "Order Details\r\n" +
      "Product: " + product + "\r\n" +
      "Size: " + size + "\r\n" +
      "Quantity: " + quantity + "\r\n\r\n" +
      "Customer Details\r\n" +
      "Name: " + name + "\r\n" +
      "Email: " + email + "\r\n" +
      "Address: " + address;

    window.location.href =
      "mailto:" + TO_ADDRESS +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
});
