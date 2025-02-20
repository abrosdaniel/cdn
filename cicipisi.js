function fadeOutAndRemoveCard() {
  const gridContainer = document.querySelector(".t951__grid-cont");
  if (!gridContainer) return;

  const card = gridContainer.querySelector(".t-store__card");
  if (!card) return;

  card.style.transition = "opacity 1s";
  card.style.opacity = "0";

  setTimeout(() => {
    card.remove();
  }, 1000);
}

setInterval(fadeOutAndRemoveCard, 10000);
