const setSkillLevels = () => {
  const overlayElements = document.querySelectorAll(".skills__overlay *");
  overlayElements.forEach((elem) => {
    if (elem instanceof HTMLElement) {
      elem.style.left = elem.dataset.level ?? "0";
    }
  });

  const skillBars = document.querySelectorAll(".skill__bar");
  skillBars.forEach((skillBar) => {
    if (skillBar instanceof HTMLElement) {
      skillBar.style.width = skillBar.dataset.level ?? "0";
    }
  });
};

export default setSkillLevels;
