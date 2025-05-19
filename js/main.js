// Toggle theme function
function initThemeToggle() {
  const themeSwitch = document.getElementById("theme-switch");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", function (e) {
    e.stopPropagation();
    if (this.checked) {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });
}

// Role text animation
function initRoleAnimation() {
  const roleElement = document.querySelector(".role-text");
  const roles = [
    { text: "Teacher", typo: null },
    { text: "Coder", typo: "Codr" },
    { text: "AI Art Scribbler", typo: null },
    { text: "Multilingual", typo: "Multilingul" },
    { text: "Philosophical", typo: null },
    { text: "Chaotic", typo: null },
    { text: "Geekish", typo: "Geeksh" },
    { text: "Swifty", typo: null },
    { text: "Reiki Master", typo: null },
    { text: "Cat Lover", typo: "Cat Luvr" },
    { text: "Star Wars Geek", typo: null },
  ];

  let currentIndex = 0;
  let isTyping = false;

  async function typeText(text, speed = 150) {
    let displayText = "";
    for (let i = 0; i < text.length; i++) {
      displayText += text[i];
      roleElement.textContent = displayText;
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }

  async function correctTypo(typo, correct) {
    let text = typo;
    for (let i = 0; i < typo.length; i++) {
      if (typo[i] !== correct[i]) {
        // Delete until the typo
        while (text.length > i) {
          text = text.slice(0, -1);
          roleElement.textContent = text;
          await new Promise((resolve) => setTimeout(resolve, 75));
        }
        // Type the rest correctly
        for (let j = i; j < correct.length; j++) {
          text += correct[j];
          roleElement.textContent = text;
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
        break;
      }
    }
    return text;
  }

  async function deleteText(speed = 75) {
    let text = roleElement.textContent;
    while (text.length > 0) {
      text = text.slice(0, -1);
      roleElement.textContent = text;
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }

  async function updateRole() {
    if (isTyping) return;
    isTyping = true;

    const role = roles[currentIndex];

    if (role.typo) {
      // Type the typo version
      await typeText(role.typo, 150);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Correct the typo
      await correctTypo(role.typo, role.text);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    } else {
      // Type the correct version directly
      await typeText(role.text, 150);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }

    // Delete the text
    await deleteText(75);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Move to next role
    currentIndex = (currentIndex + 1) % roles.length;
    isTyping = false;
    updateRole();
  }

  updateRole();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initRoleAnimation();
  animateElements();

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme")
  ) {
    document.body.setAttribute("data-theme", "dark");
    document.getElementById("theme-switch").checked = true;
  }

  // Dynamisk rendering av länkar
  const links = [
    {
      href: "https://www.linkedin.com/in/marcusmedina/",
      icon: "fab fa-linkedin",
      text: "LinkedIn",
    },
    {
      href: "https://github.com/marcusjobb",
      icon: "fab fa-github-alt",
      text: "Work GitHub",
    },
    {
      href: "http://marcusmedina.pro",
      icon: "fas fa-globe",
      text: "Website",
    },
    {
      href: "https://github.com/marcusMedina/",
      icon: "fab fa-github",
      text: "Personal GitHub",
    },
    {
      href: "https://www.instagram.com/amazingmarcus/",
      icon: "fab fa-instagram",
      text: "Instagram",
    },
    {
      href: "https://www.google.com/search?q=%22Marcus+Medina%22+%22M%C3%B6lndal%22",
      icon: "fab fa-google",
      text: "Google Me",
    },
  ];

  // Rendera länkar
  const linksList = document.querySelector(".links-list");
  if (linksList) {
    linksList.innerHTML = links
      .map(
        (link) => `
      <li class="link-item">
        <a href="${link.href}" target="_blank" rel="noopener noreferrer">
          <i class="${link.icon}"></i>
          <span>${link.text}</span>
        </a>
      </li>
    `
      )
      .join("");
  }
});

// Animate elements on page load
function animateElements() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";

    setTimeout(() => {
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, 300 + index * 200);
  });
}
