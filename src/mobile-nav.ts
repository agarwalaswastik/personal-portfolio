const setupMobileNav = () => {
  const barsButton = document.querySelector(".header__bars")! as HTMLElement;
  const mobileNav = document.querySelector(".mobile-nav")! as HTMLElement;
  const exitButton = document.querySelector(".mobile-nav__exit")! as HTMLElement;
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__menu a");

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
    const htmlELem = elem as HTMLElement;
    htmlELem.onclick = hideMobileNav;
  });
};

export default setupMobileNav;
