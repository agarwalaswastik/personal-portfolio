const setupMobileNav = () => {
  const barsButton = document.querySelector(".header__bars")!;
  const mobileNav = document.querySelector(".mobile-nav")!;
  const exitButton = document.querySelector(".mobile-nav__exit")!;
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__menu a");

  if (!(barsButton instanceof HTMLButtonElement)) return;
  if (!(mobileNav instanceof HTMLElement)) return;
  if (!(exitButton instanceof HTMLButtonElement)) return;

  const showMobileNav = () => {
    mobileNav.style.display = "flex";
    document.body.style.overflowY = "hidden";
  };

  const hideMobileNav = () => {
    mobileNav.style.display = "none";
    document.body.style.overflowY = "auto";
  };

  barsButton.onclick = showMobileNav;
  exitButton.onclick = hideMobileNav;

  mobileNavLinks.forEach((elem) => {
    if (!(elem instanceof HTMLAnchorElement)) return;
    elem.onclick = hideMobileNav;
  });
};

export default setupMobileNav;
