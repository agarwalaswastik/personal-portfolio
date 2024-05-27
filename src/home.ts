function setupHome() {
  const fallback = document.querySelector(".home__fallback")!;
  if (!(fallback instanceof HTMLElement)) return;
  fallback.style.display = "inline";
}

export default setupHome;