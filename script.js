document.querySelectorAll("[data-logo-image]").forEach((logo) => {
  logo.addEventListener("error", () => {
    const mark = logo.closest(".brand-mark");
    logo.style.display = "none";
    if (mark) {
      mark.classList.add("no-logo");
    }
  });
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-nav-link]").forEach((link) => {
  const targetPage = link.getAttribute("href");
  if (targetPage === currentPage) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const budgetForm = document.querySelector("[data-budget-form]");
if (budgetForm) {
  const packageGrid = budgetForm.querySelector("[data-package-grid]");
  const categoriesRoot = budgetForm.querySelector("[data-service-categories]");
  const totalElement = document.querySelector("[data-budget-total]");
  const summaryElement = document.querySelector("[data-budget-summary]");
  const whatsappButton = document.querySelector("[data-budget-whatsapp]");
  const eventTypeField = budgetForm.querySelector("[name='eventType']");
  const cityField = budgetForm.querySelector("[name='city']");

  const formatter = new Intl.NumberFormat("fr-MA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatMad = (value) => `${formatter.format(value)} MAD`;

  const packages = [
    {
      id: "pack-anniv-simple",
      name: "Pack Anniversaire Simple",
      price: 1500,
      details: "Animateur jeux, mini sono, maquillage enfants, mini disco light, materiel coloriage",
    },
    {
      id: "pack-anniv-plus",
      name: "Pack Anniversaire Plus",
      price: 2500,
      details: "Clown, mascotte, maquillage enfants, jeux educatifs, mini sono, cadeaux enfants simples",
    },
    {
      id: "pack-kermesse-ecole",
      name: "Pack Kermesse Ecole",
      price: 4500,
      details: "Animateur micro, jeux gonflables, mascotte, maquillage enfants, mini sono, animateur jeux",
    },
    {
      id: "pack-mariage-simple",
      name: "Pack Mariage Simple",
      price: 5000,
      details: "DJ, sono, lumiere simple, animateur micro, coordinateur evenement",
    },
    {
      id: "pack-mariage-premium",
      name: "Pack Mariage Premium",
      price: 9000,
      details: "DJ + sono + lumiere, Dakka / Gnawa, maitre de ceremonie, photobooth, coordinateur evenement",
    },
    {
      id: "pack-gala-corporate",
      name: "Pack Gala / Corporate",
      price: 7000,
      details: "Presentateur, DJ soft, sonorisation, hotesses d'accueil, photobooth, coordinateur evenement",
    },
  ];

  const serviceCategories = [
    {
      title: "Materiel & animation",
      subtitle: "Equipements et materiel d'ambiance",
      items: [
        { id: "gonflable-small", name: "Jeux gonflables petit modele", range: "900 — 1,200 DH", estimate: 1050 },
        { id: "gonflable-large", name: "Jeux gonflables grand modele", range: "1,300 — 1,800 DH", estimate: 1550 },
        { id: "mascotte-simple", name: "Mascotte simple", range: "300 — 500 DH", estimate: 400 },
        { id: "mascotte-premium", name: "Mascotte premium / sur demande", range: "600 — 900 DH", estimate: 750 },
        { id: "makeup-kids", name: "Maquillage enfants", range: "400 — 700 DH", estimate: 550 },
        { id: "jeux-educatifs", name: "Jeux educatifs", range: "300 — 600 DH", estimate: 450 },
        { id: "mini-sono", name: "Mini sono", range: "400 — 700 DH", estimate: 550 },
        { id: "cadeaux-enfants", name: "Cadeaux enfants", range: "10 — 25 DH / enfant", estimate: 18, quantityLabel: "Nombre d'enfants" },
        { id: "dessin-coloriage", name: "Materiel dessin / coloriage", range: "200 — 400 DH", estimate: 300 },
        { id: "mini-disco", name: "Mini disco light", range: "300 — 600 DH", estimate: 450 },
        { id: "photo-video-simple", name: "Photo & video simple", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "photo-video-premium", name: "Photo & video premium", range: "1,800 — 3,000 DH", estimate: 2400 },
        { id: "photobooth", name: "Photobooth", range: "1,200 — 1,800 DH", estimate: 1500 },
        { id: "photobooth-360", name: "Photobooth 360", range: "1,700 — 2,500 DH", estimate: 2100 },
        { id: "stand-simple", name: "Structure / stand simple", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "stand-deco", name: "Structure decorative / arche", range: "1,200 — 2,500 DH", estimate: 1850 },
      ],
    },
    {
      title: "Animateurs",
      subtitle: "Animation humaine, encadrement et conduite de l'ambiance",
      items: [
        { id: "animateur-micro", name: "Animateur micro", range: "600 — 1,000 DH", estimate: 800 },
        { id: "presentateur", name: "Presentateur", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "mc", name: "Maitre de ceremonie", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "clown", name: "Clown", range: "500 — 900 DH", estimate: 700 },
        { id: "magicien-enfants", name: "Magicien enfants", range: "700 — 1,200 DH", estimate: 950 },
        { id: "magicien-closeup", name: "Magicien close-up", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "mascotte-animateur", name: "Mascotte animateur", range: "400 — 700 DH", estimate: 550 },
        { id: "animateur-jeux", name: "Animateur jeux", range: "500 — 900 DH", estimate: 700 },
        { id: "maquilleuse", name: "Maquilleuse enfants", range: "400 — 700 DH", estimate: 550 },
        { id: "mini-disco-anim", name: "Animateur mini disco", range: "500 — 900 DH", estimate: 700 },
        { id: "anim-kermesse", name: "Animateur kermesse", range: "700 — 1,200 DH", estimate: 950 },
        { id: "assistant", name: "Assistant animation", range: "300 — 600 DH", estimate: 450 },
        { id: "coordinateur", name: "Coordinateur evenement", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "anim-gala", name: "Animateur gala", range: "1,200 — 2,500 DH", estimate: 1850 },
      ],
    },
    {
      title: "Spectacle",
      subtitle: "Shows visuels et artistes d'impact",
      items: [
        { id: "fire", name: "Cracheur de feu", range: "1,200 — 2,000 DH", estimate: 1600 },
        { id: "danseurs", name: "Danseurs / danseuses", range: "600 — 1,200 DH / personne", estimate: 900, quantityLabel: "Nombre de personnes" },
        { id: "robot-led", name: "Robot LED", range: "1,500 — 3,000 DH", estimate: 2250 },
        { id: "acrobat", name: "Acrobat", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "jongleur", name: "Jongleur", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "mentaliste", name: "Mentaliste", range: "1,500 — 3,000 DH", estimate: 2250 },
        { id: "show-led", name: "Show LED", range: "1,500 — 3,500 DH", estimate: 2500 },
      ],
    },
    {
      title: "Musique",
      subtitle: "Ambiance musicale et groupes live",
      items: [
        { id: "dj-simple", name: "DJ simple", range: "1,200 — 2,000 DH", estimate: 1600 },
        { id: "dj-pack", name: "DJ + sono + lumiere", range: "2,500 — 4,500 DH", estimate: 3500 },
        { id: "dakka", name: "Dakka Marrakchia", range: "1,500 — 3,000 DH", estimate: 2250 },
        { id: "gnawa", name: "Gnawa", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "issawa", name: "Issawa", range: "1,500 — 3,000 DH", estimate: 2250 },
        { id: "chaabi", name: "Chaabi", range: "2,000 — 4,000 DH", estimate: 3000 },
        { id: "folklore", name: "Folklore marocain", range: "1,500 — 3,500 DH", estimate: 2500 },
        { id: "batucada", name: "Batucada / percussion", range: "1,500 — 3,500 DH", estimate: 2500 },
        { id: "orchestre", name: "Orchestre mariage", range: "4,000 — 9,000 DH", estimate: 6500 },
        { id: "saxo", name: "Saxophoniste", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "violon", name: "Violoniste", range: "1,200 — 2,500 DH", estimate: 1850 },
        { id: "piano", name: "Pianiste", range: "1,500 — 3,000 DH", estimate: 2250 },
        { id: "live-band", name: "Live band", range: "3,000 — 8,000 DH", estimate: 5500 },
      ],
    },
    {
      title: "Accueil & service",
      subtitle: "Encadrement technique et accompagnement terrain",
      items: [
        { id: "hotesse", name: "Hotesse d'accueil", range: "400 — 800 DH", estimate: 600 },
        { id: "serveur-show", name: "Serveur show", range: "500 — 1,000 DH", estimate: 750 },
        { id: "terrain", name: "Responsable terrain", range: "800 — 1,500 DH", estimate: 1150 },
        { id: "tech-son", name: "Technicien son", range: "500 — 1,000 DH", estimate: 750 },
        { id: "tech-lumiere", name: "Technicien lumiere", range: "500 — 1,000 DH", estimate: 750 },
      ],
    },
  ];

  const buildPackageCard = (item) => `
    <label class="option-card">
      <div class="option-card-header">
        <input type="radio" name="package" value="${item.id}" data-price="${item.price}" />
        <div>
          <div class="option-card-title">${item.name}</div>
          <div class="option-card-meta">${item.details}</div>
          <div class="option-card-estimate">${formatMad(item.price)}</div>
        </div>
      </div>
    </label>
  `;

  const buildServiceCard = (item) => {
    const quantityMarkup = item.quantityLabel
      ? `
        <div class="qty-control" data-qty-control>
          <label for="qty-${item.id}">${item.quantityLabel}</label>
          <input id="qty-${item.id}" type="number" min="1" step="1" value="1" data-qty-input />
        </div>
      `
      : "";

    return `
      <label class="option-card">
        <div class="option-card-header">
          <input type="checkbox" name="service" value="${item.id}" data-price="${item.estimate}" ${item.quantityLabel ? 'data-has-quantity="true"' : ""} />
          <div>
            <div class="option-card-title">${item.name}</div>
            <div class="option-card-meta">${item.range}</div>
            <div class="option-card-estimate">Estimation retenue : ${formatMad(item.estimate)}${item.quantityLabel ? " / unite" : ""}</div>
          </div>
        </div>
        ${quantityMarkup}
      </label>
    `;
  };

  packageGrid.innerHTML = `
    <label class="option-card">
      <div class="option-card-header">
        <input type="radio" name="package" value="" checked />
        <div>
          <div class="option-card-title">Sans package</div>
          <div class="option-card-meta">Choisissez uniquement les services qui vous interessent.</div>
          <div class="option-card-estimate">0 MAD</div>
        </div>
      </div>
    </label>
    ${packages.map(buildPackageCard).join("")}
  `;

  categoriesRoot.innerHTML = serviceCategories
    .map(
      (category) => `
        <section class="option-category">
          <h3>${category.title}</h3>
          <p>${category.subtitle}</p>
          <div class="option-grid">
            ${category.items.map(buildServiceCard).join("")}
          </div>
        </section>
      `
    )
    .join("");

  const allServiceCards = [...budgetForm.querySelectorAll("input[name='service']")];

  const updateBudget = () => {
    const selectedEventType = eventTypeField.value.trim();
    const selectedPackage = budgetForm.querySelector("input[name='package']:checked");
    const selectedServices = allServiceCards.filter((input) => input.checked);

    let total = 0;
    const summaryLines = [];

    if (selectedEventType) {
      summaryLines.push(`<li><span>Type d'evenement : ${selectedEventType}</span><span>Info</span></li>`);
    }

    if (selectedPackage && selectedPackage.value) {
      const pack = packages.find((item) => item.id === selectedPackage.value);
      if (pack) {
        total += pack.price;
        summaryLines.push(`<li><span>${pack.name}</span><span>${formatMad(pack.price)}</span></li>`);
      }
    }

    selectedServices.forEach((input) => {
      const card = input.closest(".option-card");
      const qtyInput = card?.querySelector("[data-qty-input]");
      const qty = qtyInput ? Math.max(1, Number(qtyInput.value || 1)) : 1;
      const price = Number(input.dataset.price || 0) * qty;

      total += price;

      const categoryItem = serviceCategories
        .flatMap((category) => category.items)
        .find((item) => item.id === input.value);

      const suffix = qtyInput ? ` x${qty}` : "";
      summaryLines.push(`<li><span>${categoryItem?.name || input.value}${suffix}</span><span>${formatMad(price)}</span></li>`);
    });

    const hasEstimate = total > 0;
    totalElement.textContent = formatMad(total);

    if (summaryLines.length === 0) {
      summaryElement.innerHTML = `<li class="summary-empty">Aucune selection pour le moment.</li>`;
    } else {
      summaryElement.innerHTML = summaryLines.join("");
    }

    const cityValue = cityField.value.trim() || "A preciser";
    const selectedPackName = selectedPackage && selectedPackage.value
      ? packages.find((item) => item.id === selectedPackage.value)?.name || "Aucun package"
      : "Aucun package";
    const servicesText = selectedServices.length
      ? selectedServices
          .map((input) => {
            const card = input.closest(".option-card");
            const qtyInput = card?.querySelector("[data-qty-input]");
            const qty = qtyInput ? Math.max(1, Number(qtyInput.value || 1)) : 1;
            const item = serviceCategories.flatMap((category) => category.items).find((entry) => entry.id === input.value);
            return `${item?.name || input.value}${qtyInput ? ` x${qty}` : ""}`;
          })
          .join(", ")
      : "Aucun service";

    const message = [
      "Salam, bghit estimation dyal event m3a Paloma Animation.",
      `Type d'evenement: ${selectedEventType || "A preciser"}`,
      `Ville: ${cityValue}`,
      `Package: ${selectedPackName}`,
      `Services: ${servicesText}`,
      `Estimation: ${formatMad(total)}`,
    ].join("\n");

    whatsappButton.href = `https://wa.me/212612828842?text=${encodeURIComponent(message)}`;
    whatsappButton.classList.toggle("is-disabled", !hasEstimate);
    whatsappButton.setAttribute("aria-disabled", String(!hasEstimate));
  };

  budgetForm.addEventListener("change", (event) => {
    if (event.target.matches("input[data-has-quantity='true']")) {
      const card = event.target.closest(".option-card");
      const qtyControl = card?.querySelector("[data-qty-control]");
      if (qtyControl) {
        qtyControl.classList.toggle("is-visible", event.target.checked);
      }
    }
    updateBudget();
  });

  budgetForm.addEventListener("input", updateBudget);
  updateBudget();
}
