"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Footer year and current-page navigation state.
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === currentFile) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Responsive navigation.
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Accessible FAQ accordion.
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
      const symbol = button.querySelector("span");
      if (symbol) symbol.textContent = expanded ? "+" : "−";
    });
  });

  // Product search/filter. The JSON catalogue is loaded asynchronously (AJAX-style).
  // Existing HTML cards remain as a no-JavaScript / offline fallback.
  const search = document.getElementById("product-search");
  const productGrid = document.getElementById("product-grid");
  if (search && productGrid) {
    const count = document.getElementById("search-count");
    const empty = document.getElementById("no-products");
    const filter = () => {
      const term = search.value.trim().toLowerCase();
      const products = Array.from(productGrid.querySelectorAll(".product-item"));
      let visible = 0;
      products.forEach((product) => {
        const matches = (product.dataset.search || product.textContent).toLowerCase().includes(term);
        product.hidden = !matches;
        if (matches) visible += 1;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? "product" : "products"}`;
      if (empty) empty.hidden = visible !== 0;
    };
    search.addEventListener("input", filter);
    filter();

    fetch("data/products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Product catalogue could not be loaded.");
        return response.json();
      })
      .then((items) => {
        if (!Array.isArray(items)) throw new Error("Product catalogue format is invalid.");
        productGrid.replaceChildren();
        items.forEach((item) => {
          const article = document.createElement("article");
          article.className = "card product-card product-item";
          article.dataset.search = `${item.keywords || ""} ${item.name || ""}`.toLowerCase();
          const image = document.createElement("img");
          image.src = `images/${item.image}`;
          image.alt = `${item.name} from Flex Fit Active Wear`;
          const cardBody = document.createElement("div");
          cardBody.className = "card-body";
          const heading = document.createElement("h3");
          heading.textContent = item.name;
          const price = document.createElement("p");
          price.className = "price";
          price.textContent = item.price;
          const description = document.createElement("p");
          description.textContent = item.description;
          const link = document.createElement("a");
          link.className = "button secondary";
          link.href = `enquiry.html?product=${encodeURIComponent(item.name)}`;
          link.textContent = "Enquire about this item";
          cardBody.append(heading, price, description, link);
          article.append(image, cardBody);
          productGrid.append(article);
        });
        filter();
      })
      .catch(() => {
        // Keep the static product cards available if fetch is blocked or offline.
        filter();
      });
  }

  // Fill product choice when an enquiry link includes ?product=...
  const productSelect = document.getElementById("product");
  if (productSelect) {
    const requested = new URLSearchParams(window.location.search).get("product");
    if (requested) {
      const option = Array.from(productSelect.options).find((item) =>
        item.value.toLowerCase() === requested.toLowerCase() ||
        item.textContent.toLowerCase() === requested.toLowerCase()
      );
      if (option) productSelect.value = option.value;
    }
  }

  // Gallery lightbox.
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.getElementById("lightbox-close");
  let previousFocus = null;
  const closeGallery = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImage) lightboxImage.src = "";
    if (previousFocus) previousFocus.focus();
  };
  document.querySelectorAll(".gallery-item").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      previousFocus = button;
      lightboxImage.src = button.dataset.full || "";
      lightboxImage.alt = button.querySelector("img")?.alt || "";
      if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeLightbox) closeLightbox.focus();
    });
  });
  if (closeLightbox) closeLightbox.addEventListener("click", closeGallery);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeGallery();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) closeGallery();
    });
  }

  // Shared validation helpers.
  const setError = (input, errorNode, message) => {
    if (errorNode) errorNode.textContent = message;
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  };
  const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validPhone = (value) => /^(\+27|0)[0-9\s-]{9,13}$/.test(value.trim());

  // Enquiry form: validates input and returns a tailored confirmation.
  const enquiryForm = document.getElementById("enquiry-form");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = {
        first: document.getElementById("first-name"),
        surname: document.getElementById("surname"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        product: document.getElementById("product"),
        message: document.getElementById("message")
      };
      let valid = true;
      const checks = [
        ["first", "first-name-error", fields.first.value.trim().length >= 2, "Please enter at least 2 characters for your first name."],
        ["surname", "surname-error", fields.surname.value.trim().length >= 2, "Please enter at least 2 characters for your surname."],
        ["email", "email-error", validEmail(fields.email.value.trim()), "Please enter a valid email address."],
        ["phone", "phone-error", validPhone(fields.phone.value), "Enter a valid South African number, for example 082 123 4567."],
        ["product", "product-error", fields.product.value !== "", "Please select a product or choose a general question."],
        ["message", "message-error", fields.message.value.trim().length >= 10, "Please enter a message of at least 10 characters."]
      ];
      checks.forEach(([key, errorId, passed, message]) => {
        setError(fields[key], document.getElementById(errorId), passed ? "" : message);
        if (!passed) valid = false;
      });
      const status = document.getElementById("enquiry-status");
      const actions = document.getElementById("enquiry-actions");
      if (!valid) {
        if (status) status.textContent = "Please correct the highlighted fields and submit again.";
        if (actions) actions.hidden = true;
        const firstInvalid = enquiryForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const message = [
        "Hello Flex Fit Active Wear, I would like to enquire about:",
        `Name: ${fields.first.value.trim()} ${fields.surname.value.trim()}`,
        `Email: ${fields.email.value.trim()}`,
        `Phone: ${fields.phone.value.trim()}`,
        `Product: ${fields.product.value}`,
        `Preferred size: ${document.getElementById("size").value || "Not specified"}`,
        `Message: ${fields.message.value.trim()}`
      ].join("\n");
      const whatsapp = document.getElementById("enquiry-whatsapp");
      if (whatsapp) whatsapp.href = `https://wa.me/27822172610?text=${encodeURIComponent(message)}`;
      if (status) status.textContent = `Thank you, ${fields.first.value.trim()}. Your enquiry details have been prepared. Use WhatsApp below to send them to Flex Fit.`;
      if (actions) actions.hidden = false;
      const copyButton = document.getElementById("copy-enquiry");
      if (copyButton) {
        copyButton.onclick = async () => {
          try {
            await navigator.clipboard.writeText(message);
            if (status) status.textContent = "Your enquiry message has been copied.";
          } catch {
            if (status) status.textContent = "Copy is unavailable in this browser. Select and copy your enquiry details manually.";
          }
        };
      }
    });
  }

  // Contact form: validates and composes an email draft. Recipient must be supplied by the business.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const subject = document.getElementById("contact-subject");
      const messageField = document.getElementById("contact-message");
      const fields = [
        [name, "contact-name-error", name.value.trim().length >= 2, "Please enter your name."],
        [email, "contact-email-error", validEmail(email.value.trim()), "Please enter a valid email address."],
        [subject, "contact-subject-error", subject.value.trim().length >= 3, "Please enter a subject."],
        [messageField, "contact-message-error", messageField.value.trim().length >= 10, "Please enter a message of at least 10 characters."]
      ];
      let valid = true;
      fields.forEach(([input, errorId, passed, errorText]) => {
        setError(input, document.getElementById(errorId), passed ? "" : errorText);
        if (!passed) valid = false;
      });
      const status = document.getElementById("contact-status");
      const action = document.getElementById("contact-email-action");
      if (!valid) {
        if (status) status.textContent = "Please correct the highlighted fields and submit again.";
        if (action) action.hidden = true;
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const body = `Name: ${name.value.trim()}\nReply email: ${email.value.trim()}\n\n${messageField.value.trim()}`;
      const mailto = `mailto:?subject=${encodeURIComponent(subject.value.trim())}&body=${encodeURIComponent(body)}`;
      const emailLink = document.getElementById("open-email");
      if (emailLink) emailLink.href = mailto;
      if (status) status.textContent = "Your message has been checked and prepared as an email draft. Add Flex Fit's business email address in the To field before sending, or contact the business through WhatsApp.";
      if (action) action.hidden = false;
      const copyButton = document.getElementById("copy-contact");
      if (copyButton) {
        copyButton.onclick = async () => {
          try {
            await navigator.clipboard.writeText(`Subject: ${subject.value.trim()}\n\n${body}`);
            if (status) status.textContent = "Your contact message has been copied.";
          } catch {
            if (status) status.textContent = "Copy is unavailable in this browser. You can use the prepared email draft.";
          }
        };
      }
    });
  }
});
