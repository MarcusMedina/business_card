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

let loadedRoles = null;

async function loadContactInfo() {
  try {
    const response = await fetch("contact.json");
    const data = await response.json();

    // Namn
    const nameEl = document.querySelector(".name");
    if (nameEl) nameEl.textContent = data.name;

    // Titel
    const titleEl = document.querySelector(".role-text");
    if (titleEl) titleEl.textContent = data.title;

    // Avatar
    const avatarEl = document.querySelector(".avatar-img");
    if (avatarEl) avatarEl.src = data.avatar;

    // E-post
    const emailLink = document.querySelector(".contact-item a");
    if (emailLink) {
      emailLink.href = `mailto:${data.email}`;
      emailLink.textContent = data.email;
    }

    // Länkar
    const linksList = document.querySelector(".links-list");
    if (linksList && Array.isArray(data.links)) {
      linksList.innerHTML = data.links
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

    // Roller (för type-effekten)
    if (Array.isArray(data.roles)) {
      loadedRoles = data.roles;
    }

    // Starta avatar-effekten EFTER att avatar är laddad
    startWeirdAvatarEffect();
  } catch (err) {
    console.error("Could not load contact.json", err);
  }
}

// Role text animation
function initRoleAnimation() {
  const roleElement = document.querySelector(".role-text");
  // Använd roller från JSON om de finns, annars fallback
  const roles = loadedRoles || [
    { text: "Teacher", typo: null },
    { text: "Coder", typo: "Codr" },
    { text: "AI Art Scribbler", typo: "AI Art Scribler" },
    { text: "Multilingual", typo: "Multilingul" },
    { text: "Philosophical", typo: "Philosphical" },
    { text: "Chaotic", typo: "Chatic" },
    { text: "Geekish", typo: "Geeksh" },
    { text: "Swifty", typo: "Swify" },
    { text: "Reiki Master", typo: "Reiki Mastre" },
    { text: "Cat Lover", typo: "Cat Luvr" },
    { text: "Star Wars Geek", typo: "Star Wars Gek" },
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
    const useTypo = role.typo && Math.random() > 0.75;

    if (useTypo) {
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

function startWeirdAvatarEffect() {
  const avatar = document.querySelector(".avatar-img");
  if (!avatar) return;

  setInterval(() => {
    if (Math.random() > 0.8) {
      avatar.classList.add("weird");
      // För felsökning
      console.log("Avatar goes weird!");
      setTimeout(() => avatar.classList.remove("weird"), 1200);
    }
  }, 4000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  initThemeToggle();
  await loadContactInfo();
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
