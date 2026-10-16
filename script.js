// ==========================================
// PERFECT COMPUTER - WEBSITE JAVASCRIPT
// ==========================================

// 1. SERVICES DATA
const services = [
  {
    title: "CCTV Sales & Service",
    description:
      "CCTV camera installation, surveillance systems, maintenance and support.",
    icon: "cctv"
  },
  {
    title: "Networking Solutions",
    description:
      "Network equipment, connectivity solutions and infrastructure support.",
    icon: "network"
  },
  {
    title: "Hardware Troubleshooting",
    description:
      "Professional troubleshooting and diagnostics for hardware problems.",
    icon: "wrench"
  },
  {
    title: "Laptop Sales & Service",
    description:
      "Laptop sales, maintenance, diagnostics and technical support.",
    icon: "laptop"
  },
  {
    title: "Desktop Sales & Service",
    description:
      "Desktop computers, upgrades, repairs and technical assistance.",
    icon: "monitor"
  },
  {
    title: "Video Conferencing",
    description:
      "Complete video conferencing setups for offices and institutions.",
    icon: "video"
  },
  {
    title: "Air Conditioner Solutions",
    description:
      "Air-conditioning equipment and related workplace solutions.",
    icon: "snowflake"
  },
  {
    title: "Printer Solutions",
    description:
      "Printer sales, installation, troubleshooting and service support.",
    icon: "printer"
  },
  {
    title: "Projector Solutions",
    description:
      "Projectors for classrooms, presentations, meetings and events.",
    icon: "presentation"
  },
  {
    title: "Interactive Displays",
    description:
      "Interactive display systems for smart classrooms and meeting rooms.",
    icon: "monitor-speaker"
  },
  {
    title: "Active LED Displays",
    description:
      "LED display solutions for professional and commercial spaces.",
    icon: "panels-top-left"
  },
  {
    title: "Attendance Systems",
    description:
      "Attendance management systems for offices and institutions.",
    icon: "scan-face"
  },
  {
    title: "Sound Systems",
    description:
      "Audio equipment for offices, conference rooms and commercial venues.",
    icon: "audio-lines"
  }
];


// 2. PRODUCT DATA
const products = [
  {
    title: "Computers & Laptops",
    description:
      "Computing solutions for personal, professional and business use.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    alt: "Laptop computer"
  },
  {
    title: "CCTV & Security",
    description:
      "Security cameras and surveillance equipment for different environments.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80",
    alt: "Security camera"
  },
  {
    title: "Networking Equipment",
    description:
      "Networking infrastructure and connectivity equipment.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    alt: "Networking equipment"
  },
  {
    title: "Printers & Office Equipment",
    description:
      "Printing and office technology for everyday business operations.",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
    alt: "Office printer"
  },
  {
    title: "Projectors & Displays",
    description:
      "Display and projection solutions for meetings and presentations.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    alt: "Modern office"
  },
  {
    title: "Workplace Technology",
    description:
      "Technology solutions for productive and connected workspaces.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    alt: "Professional workspace"
  }
];


// 3. GENERATE SERVICE CARDS
const serviceGrid = document.getElementById("serviceGrid");
const serviceSelect = document.getElementById("serviceSelect");

if (serviceGrid) {
  services.forEach(function (service) {
    const card = document.createElement("article");

    card.className = "service-card reveal";

    card.innerHTML = `
      <span class="service-icon">
        <i data-lucide="${service.icon}"></i>
      </span>

      <h3>${service.title}</h3>

      <p>${service.description}</p>

      <a href="#contact"
         data-service="${service.title}">
        Enquire now
        <i data-lucide="arrow-up-right"></i>
      </a>
    `;

    serviceGrid.appendChild(card);
  });
}


// 4. POPULATE THE SERVICE DROPDOWN
if (serviceSelect) {
  services.forEach(function (service) {
    const option = document.createElement("option");

    option.value = service.title;
    option.textContent = service.title;

    serviceSelect.appendChild(option);
  });
}


// 5. GENERATE PRODUCT CARDS
const productGrid = document.getElementById("productGrid");

if (productGrid) {
  products.forEach(function (product) {
    const card = document.createElement("article");

    card.className = "product-card reveal";

    card.innerHTML = `
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.alt}"
          loading="lazy"
        >
      </div>

      <div class="product-info">
        <h3>${product.title}</h3>

        <p>${product.description}</p>

        <a href="#contact"
           data-product="${product.title}">
          Enquire about products
          <i data-lucide="arrow-up-right"></i>
        </a>
      </div>
    `;

    productGrid.appendChild(card);
  });
}


// 6. INITIALIZE LUCIDE ICONS
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

refreshIcons();


// 7. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    refreshIcons();
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");

      document.body.classList.remove("menu-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

      menuToggle.innerHTML =
        '<i data-lucide="menu"></i>';

      refreshIcons();
    });
  });
}


// 8. HEADER SCROLL EFFECT
const header = document.querySelector(".site-header");

function updateHeader() {
  if (header) {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  }
}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


// 9. SCROLL REVEAL ANIMATIONS
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".reveal").forEach(
    function (element) {
      revealObserver.observe(element);
    }
  );
} else {
  document.querySelectorAll(".reveal").forEach(
    function (element) {
      element.classList.add("visible");
    }
  );
}


// 10. AUTOMATICALLY SELECT A SERVICE OR PRODUCT
document.addEventListener("click", function (event) {
  const serviceLink = event.target.closest(
    "[data-service]"
  );

  const productLink = event.target.closest(
    "[data-product]"
  );

  if (serviceLink && serviceSelect) {
    serviceSelect.value =
      serviceLink.dataset.service;
  }

  if (productLink) {
    const productName =
      productLink.dataset.product;

    const messageField = document.querySelector(
      'textarea[name="message"]'
    );

    if (serviceSelect) {
      const matchingOption = Array.from(
        serviceSelect.options
      ).find(function (option) {
        return option.value === productName;
      });

      serviceSelect.value = matchingOption
        ? matchingOption.value
        : "";
    }

    if (messageField) {
      messageField.value =
        "I would like to enquire about " +
        productName +
        ".";
    }
  }
});


// 11. CONTACT / ENQUIRY FORM
const enquiryForm = document.getElementById(
  "enquiryForm"
);

const formStatus = document.getElementById(
  "formStatus"
);

if (enquiryForm) {
  enquiryForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.classList.remove("error");
      }

      // Validate required fields.
      if (!enquiryForm.reportValidity()) {
        return;
      }

      const formData = new FormData(enquiryForm);

      const name = formData.get("name");
      const company = formData.get("company");
      const phone = formData.get("phone");
      const email = formData.get("email");
      const service = formData.get("service");
      const message = formData.get("message");

      const subject =
        "Website Enquiry - " + service;

      const body = [
        "Hello Perfect Computer,",
        "",
        "I would like to make an enquiry.",
        "",
        "Name: " + name,
        "Company / Organization: " +
          (company || "Not provided"),
        "Phone: " + phone,
        "Email: " + (email || "Not provided"),
        "Service Required: " + service,
        "",
        "Message:",
        message,
        "",
        "Sent from the Perfect Computer website."
      ].join("\n");

      const mailto =
        "mailto:perfectcomputer465@gmail.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      if (formStatus) {
        formStatus.textContent =
          "Opening your email application...";
      }

      // Opens the visitor's default email application.
      window.location.href = mailto;
    }
  );
}


// 12. WHATSAPP CONTACT BUTTON
// The WhatsApp link is included in index.html.
// No additional JavaScript is needed.


// 13. AUTOMATIC COPYRIGHT YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


// 14. LOG A MESSAGE IN THE DEVELOPER CONSOLE
console.log(
  "Perfect Computer website JavaScript loaded successfully."
);