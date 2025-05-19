# Digital Business Card

A modern, dynamic, and interactive digital business card built for Marcus Medina. This project serves as a central point for contact information, professional links, and a brief presentation.

## Features

- **Dynamic Content:** Contact details and links are loaded from a JSON file (`contact.json`) for easy updates.
- **Typing Effect:** Engaging animated typing effect for the role description.
- **Interactive Avatar:** A fun, random "weird" effect on the avatar.
- **Theme Toggle:** Switch between light and dark mode.
- **vCard Download:** Easily save contact information using a downloadable .vcf file.
- **SEO & Accessibility:** Includes Open Graph tags for link previews, skip-link, ARIA attributes, and semantic HTML for improved search engine visibility and user accessibility.
- **FTP Deployment Workflow:** Includes a GitHub Actions workflow for automated deployment via FTP.

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- [Font Awesome](https://fontawesome.com/) for icons
- Built with [Bolt](https://bolt.new/?rid=ltmqv6) and edited using [Cursor AI](https://www.cursor.com/)

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```
2.  **Customize Your Information:**
    - Update the `contact.json` file with your name, title, email, avatar image path, roles, and links.
    - Update the `contact.vcf` file with your contact details.
    - Replace `familyguyed-myself.png` with your own avatar image.
    - Generate and replace the favicon. You can make your own at [favicon.io](https://favicon.io/)
3.  **Deployment (Optional - using GitHub Actions):**
    - Ensure you have the `deploy.yml` workflow file in `.github/workflows/`.
    - Add your FTP credentials as GitHub Secrets in your repository settings:
      - `FTP_HOST`
      - `FTP_USER`
      - `FTP_PASSWORD`
    - Configure the `local-dir` in `deploy.yml` if your project files are in a subdirectory (e.g., `dist/` if you add a build step).
    - Push to the `main` branch to trigger the automated deployment.

## License & Contribution

This project is open-source. You are free to copy, modify, and use this code for your own digital business card under the following conditions:

- You **must** replace all personal contact information (name, email, links, avatar, vCard data) with your own.
- You **must** give credit to Marcus Medina as the original author, ideally by keeping the "About" section mentioning Bolt and Cursor AI, or linking back to the original repository.

This license is inspired by the permissive nature of the MIT License, tailored for this specific use case.

## About

This digital business card was initially created with [Bolt](https://bolt.new/?rid=ltmqv6), a tool for building web apps from prompts, and significantly enhanced through pair programming with [Cursor AI](https://www.cursor.com/). Vibe Coded to the max!

---

Kind regards,
Marcus Medina
