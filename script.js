const searchInput = document.querySelector("#shortcutSearch");
const cards = Array.from(document.querySelectorAll(".shortcut"));
const filters = Array.from(document.querySelectorAll(".filter"));
const emptyState = document.querySelector("#emptyState");

let activeFilter = "all";

function normalize(value) {
  return value.trim().toLowerCase();
}

function cardMatches(card, query) {
  const categories = card.dataset.category || "";
  const keywords = card.dataset.keywords || "";
  const text = `${card.textContent} ${keywords}`.toLowerCase();
  const filterOk = activeFilter === "all" || categories.split(" ").includes(activeFilter);
  const queryOk = !query || text.includes(query);
  return filterOk && queryOk;
}

function updateCards() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const isVisible = cardMatches(card, query);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    updateCards();
  });
});

searchInput.addEventListener("input", updateCards);
