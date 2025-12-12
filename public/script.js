async function registerUser() {
    const username = document.getElementById("inputField").value;
    const password = document.getElementById("inputField2").value;
    const email = document.getElementById("inputField3").value.toLowerCase();
    const messageElement = document.getElementById("message");

    if (!username || !password || !email) {
        alert("Please enter a username, password, and email.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const response = await fetch("/.netlify/functions/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error || "Registration failed.");
        }
    } catch (error) {
        alert("Error connecting to the server.");
        console.error(error);
    }
}

const openRegisterImg = document.getElementById("openRegisterImg");
const openRegisterBtn = document.getElementById("openRegisterBtn");
const closeBtn = document.getElementById("close-login");
const overlay = document.getElementById("overlay");
const loginForm = document.getElementById("login-form");
// const landing = document.getElementById("landing-screen");

function openRegister() {
  overlay.classList.remove("hidden");
  loginForm.classList.remove("hidden");
  // landing.classList.add("hidden");
}
if (openRegisterImg) {
  openRegisterImg.addEventListener("click", openRegister);
}
if (openRegisterBtn) {
  openRegisterBtn.addEventListener("click", openRegister);
}

closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  loginForm.classList.add("hidden");
  // landing.classList.remove("hidden");
});


function scaleNavbar() {
  if (window.innerWidth > 600) return;
  const wrapper = document.querySelector('.navbar-wrapper');
  const originalHeight = 70;
  const minWidth = 320;
  const maxWidth = 1300;
  const vw = window.innerWidth;

  let scale;
  if (vw >= maxWidth) {
    scale = 1;
  } else if (vw <= minWidth) {
    scale = 0.25;
  } else {
    scale = 0.25 + ((vw - minWidth) / (maxWidth - minWidth)) * (1 - 0.25);
  }

  wrapper.style.transform = `scale(${scale})`;
  wrapper.style.height = `${originalHeight * scale}px`;
}

window.addEventListener('resize', scaleNavbar);
window.addEventListener('load', scaleNavbar);
