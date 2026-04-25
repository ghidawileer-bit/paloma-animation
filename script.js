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

const budgetForm = document.querySelector("[data-budget-form]");
if (budgetForm) {
  const totalElement = document.querySelector("[data-budget-total]");
  const summaryElement = document.querySelector("[data-budget-summary]");
  const whatsappButton = document.querySelector("[data-budget-whatsapp]");
  const formatter = new Intl.NumberFormat("fr-MA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatMad = (value) => `${formatter.format(value)} MAD`;

  const buildLine = (label, price) => `<li><span>${label}</span><span>${formatMad(price)}</span></li>`;

  const updateBudget = () => {
    const eventType = budgetForm.querySelector("[name='eventType']");
    const guestRange = budgetForm.querySelector("[name='guestRange']");
    const duration = budgetForm.querySelector("[name='duration']");
    const city = budgetForm.querySelector("[name='city']");
    const selectedServices = [...budgetForm.querySelectorAll("input[name='service']:checked")];

    let total = 0;
    const summaryLines = [];

    [
      { field: eventType, label: "Evenement" },
      { field: guestRange, label: "Invites" },
      { field: duration, label: "Duree" },
    ].forEach(({ field, label }) => {
      const option = field.options[field.selectedIndex];
      const price = Number(option.dataset.price || 0);
      total += price;
      summaryLines.push(buildLine(`${label} : ${option.value}`, price));
    });

    selectedServices.forEach((service) => {
      const price = Number(service.dataset.price || 0);
      total += price;
      summaryLines.push(buildLine(`Option : ${service.value}`, price));
    });

    if (selectedServices.length === 0) {
      summaryLines.push("<li class='summary-empty'>Aucune option supplementaire selectionnee.</li>");
    }

    totalElement.textContent = formatMad(total);
    summaryElement.innerHTML = summaryLines.join("");

    const cityValue = city.value.trim() || "A preciser";
    const servicesText = selectedServices.length
      ? selectedServices.map((service) => service.value).join(", ")
      : "Aucune option supplementaire";
    const message = [
      "Salam, bghit estimation/confimation dyal event m3a Paloma Animation.",
      `Evenement: ${eventType.value}`,
      `Invites: ${guestRange.value}`,
      `Duree: ${duration.value}`,
      `Ville: ${cityValue}`,
      `Options: ${servicesText}`,
      `Estimation: ${formatMad(total)}`,
    ].join("\n");

    whatsappButton.href = `https://wa.me/212612828842?text=${encodeURIComponent(message)}`;
  };

  budgetForm.addEventListener("input", updateBudget);
  budgetForm.addEventListener("change", updateBudget);
  updateBudget();
}
