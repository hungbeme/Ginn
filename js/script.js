"use strict";

// SELECTING ELEMENTS

const navBtn = document.querySelector(".navIcons");
const overlayBtn = document.querySelector(".overlay");
const bodyEl = document.body;
const sectionEl = document.querySelector(".herosection");

// IMPLEMENTING THE NAVIGATION FUNCTIONALITY

const navFunc = function () {
  bodyEl.classList.toggle("show");
};

navBtn.addEventListener("click", function () {
  navFunc();
});
overlayBtn.addEventListener("click", function () {
  navFunc();
});

// SMOOTH SCROLLING FOR NAVIGATION

const links = document.querySelectorAll('a[href^="#"], a[href="#"]');

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      bodyEl.classList.remove("show");
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();

      const selectedEl = document.querySelector(href);

      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: "smooth" });
      }

      bodyEl.classList.remove("show");
    }
  });
});

// const links = document.querySelectorAll("a:link");
// links.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     const href = link.getAttribute("href");
//     if (href === "#") {
//       console.log("nostart");
//       e.preventDefault();
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//       bodyEl.classList.remove("show");
//     }

//     if (href !== "#" && href.startsWith("#")) {
//       console.log("starts");
//       const selectedEl = document.querySelector(href);
//       console.log(selectedEl);
//       selectedEl.scrollIntoView({ behavior: "smooth" });
//       bodyEl.classList.remove("show");
//     }
//   });
// });

// STICKY NAVIGATION

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      bodyEl.classList.add("sticky");
    } else {
      bodyEl.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-10% 0px 0px 0px",
  },
);

obs.observe(sectionEl);

// FORM SUBMISSION FOR NEWSLETTER

const form = document.getElementById("newsletter-form");
const statusMsg = document.getElementById("form-status");
const inputEmail = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  //   console.log("submitted");
  //   console.log("data");

  console.log(inputEmail.value);
  //   if (inputEmail.value !== "") {
  try {
    const response = await fetch("https://formspree.io/f/mdajpvgo", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      statusMsg.textContent = "Thanks for subscribing!";
      console.log("yes");
      form.reset();
    } else {
      statusMsg.textContent = "Oops! Something went wrong.";
      console.log("oops");
    }
  } catch (error) {
    statusMsg.textContent = "Network error. Try again.";

    console.log(error);
  }
  //   } else {
  //     console.log("empty input");
  //     statusMsg.textContent = "Please input your email !!!!";
  //     statusMsg.style.color = "red";
  //     statusMsg.style.textAlign = "center";
  //   }
});

// GO TO REGISTRATION PAGE
const joinGinnBtn = document.querySelectorAll(".join");
joinGinnBtn.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./register.html";
  });
});
