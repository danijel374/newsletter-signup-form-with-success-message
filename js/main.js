const main = document.querySelector("main");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const checkValidEmail = (email) => emailPattern.test(email);

const SELECTORS = {
  email: "#email",
  form: ".card__form",
  container: ".card__email-container",
  submitButton: "button[type='submit']",
  dismissButton: ".success-card button",
};

const CLASSES = {
  invalid: "card__email-container--invalid",
  active: "card__button--active",
  disabled: "card__button--disabled",
  successCard: "success-card",
  card: "card",
};

// Utility functions
const createSuccessCard = (email) => {
  const successCard = document.createElement("div");
  successCard.className = CLASSES.successCard;
  successCard.innerHTML = `
    <img src="assets/images/icon-success.svg" alt="success icon" width="64" height="64" />
    <h1 class="text-preset-1-700">Thanks for subscribing!</h1>
    <p class="success-card__text">
      A confirmation email has been sent to <b>${email}</b>.
      Please open it and click the button inside to confirm your subscription
    </p>
    <button class="button">Dismiss message</button>
  `;
  return successCard;
};

const createNewCard = () => {
  const newCard = document.createElement("div");
  newCard.className = CLASSES.card;
  newCard.innerHTML = `
    <picture class="card__img">
      <source media="(min-width:1024px)" srcset="./assets/images/illustration-sign-up-desktop.svg" />
      <source media="(min-width:768px)" srcset="./assets/images/illustration-sign-up-tablet.svg" />
      <img src="./assets/images/illustration-sign-up-mobile.svg" alt="Illustration" />
    </picture>
    <div class="card__content">
      <div class="card__text">
        <h1 class="card__title">Stay updated!</h1>
        <p class="text-preset-2-400">Join 60,000+ product managers receiving monthly updates on:</p>
        <ul class="card__list text-preset-2-400">
          <li>Product discovery and building what matters</li>
          <li>Measuring to ensure updates are a success</li>
          <li>And much more!</li>
        </ul>
      </div>
      <form action="" class="card__form">
        <div class="card__email-container">
          <label class="text-preset-3-700" for="email">Email address</label>
          <input type="email" id="email" placeholder="email@company.com" />
        </div>
        <button type="submit" class="button text-preset-2-700">Subscribe to monthly newsletter</button>
      </form>
    </div>
  `;
  return newCard;
};

// Event handlers
main.addEventListener("submit", (event) => {
  const form = event.target.closest(SELECTORS.form);
  if (!form) return;

  form.noValidate = true;
  event.preventDefault();

  const email = document.querySelector(SELECTORS.email);
  const container = document.querySelector(SELECTORS.container);
  const card = document.querySelector(`.${CLASSES.card}`);

  if (!email || !container || !card) return;

  if (checkValidEmail(email.value)) {
    container.classList.remove(CLASSES.invalid);
    card.remove();

    const successCard = createSuccessCard(email.value);
    main.appendChild(successCard);
  } else {
    container.classList.add(CLASSES.invalid);
  }
});

main.addEventListener("click", (event) => {
  if (!event.target.closest(SELECTORS.dismissButton)) return;

  const successCard = document.querySelector(`.${CLASSES.successCard}`);
  if (successCard) {
    successCard.remove();
    main.appendChild(createNewCard());
  }
});

main.addEventListener("input", (event) => {
  if (event.target.id !== "email") return;

  const email = event.target;
  const container = email.closest(SELECTORS.container);
  const button = email
    .closest(`.${CLASSES.card}`)
    ?.querySelector(SELECTORS.submitButton);

  if (!container || !button) return;

  if (checkValidEmail(email.value)) {
    button.classList.add(CLASSES.active);
    button.classList.remove(CLASSES.disabled);
    container.classList.remove(CLASSES.invalid);
  } else {
    button.classList.remove(CLASSES.active);
    button.classList.add(CLASSES.disabled);
  }
});

main.addEventListener(
  "blur",
  (event) => {
    if (event.target.id !== "email") return;

    const email = event.target;
    const container = email.closest(SELECTORS.container);

    if (container && email.value.trim() && !checkValidEmail(email.value)) {
      container.classList.add(CLASSES.invalid);
    }
  },
  true
);
