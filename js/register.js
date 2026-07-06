"use strict";

const form = document.getElementById("register-form");
const message = document.getElementById("message");

// 👉 PUT YOUR FORMSPREE ID HERE LATER
const FORMSPREE_URL = "https://formspree.io/f/xpqnovog";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const state = document.getElementById("state").value.trim();
  const reason = document.getElementById("reason").value.trim();

  // Basic validation
  if (!fullname || !email || !phone || !state || !reason) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    message.textContent = "Please enter a valid email.";
    message.style.color = "red";
    return;
  }

  try {
    message.textContent = "Submitting...";
    message.style.color = "#0f1d45";
    const formData = new FormData(form);

    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok && response.status === 200) {
      message.textContent = "Registration successful";
      message.style.color = "green";
      form.reset();
    } else {
      message.textContent = "Something went wrong. Try again!";
      message.style.color = "red";
    }
  } catch (error) {
    message.textContent = "Network error. Check your connection!";
    message.style.color = "red";
  }
});
