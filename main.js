const toggle = document.querySelector(".menu-toggle");
const navEl = document.querySelector(".primary-nav");
if (toggle && navEl) {
  toggle.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
document.querySelectorAll("[data-demo-form]").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = form.querySelector(".form-status");
    status.textContent =
      "Thank you. This demonstration form has been validated successfully.";
    status.classList.add("success");
    form.reset();
  }),
);
const products = window.LIGHTHEAVEN_PRODUCTS || [];
const select = document.querySelector("#product-select");
if (select && products.length) {
  products.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} — $${p.price.toFixed(2)}`;
    select.append(option);
  });
  const params = new URLSearchParams(location.search);
  const requested = params.get("product");
  if (products.some((p) => p.id === requested)) select.value = requested;
  const qty = document.querySelector("#quantity");
  const update = () => {
    const p = products.find((x) => x.id === select.value) || products[0];
    const q = Math.max(1, Number(qty.value) || 1);
    document.querySelector("#summary-name").textContent = p.name;
    document.querySelector("#summary-price").textContent =
      `$${p.price.toFixed(2)}`;
    document.querySelector("#summary-quantity").textContent = q;
    document.querySelector("#summary-total").textContent =
      `$${(p.price * q).toFixed(2)}`;
    const img = document.querySelector("#summary-image");
    img.src = p.image;
    img.alt = p.name;
  };
  select.addEventListener("change", update);
  qty.addEventListener("input", update);
  update();
  document.querySelector("#order-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const status = e.currentTarget.querySelector(".form-status");
    // status.textContent =
    //   "Your demonstration order request is complete. No data or payment was submitted.";
    status.classList.add("success");
  });
}
document.addEventListener("DOMContentLoaded", function() {
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const detailBoxes = document.querySelectorAll('.payment-detail-box');
  paymentRadios.forEach(radio => {
    radio.addEventListener('change', function(e) {
      detailBoxes.forEach(box => {
        box.classList.remove('active');
      });
      const selectedValue = e.target.value; 
      const activeBox = document.getElementById(`details-${selectedValue}`);
      if (activeBox) {
        activeBox.classList.add('active');
      }
    });
  });
});