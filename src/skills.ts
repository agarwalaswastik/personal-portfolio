const setupSkills = () => {
  const overlayElements = document.querySelectorAll(".skills__overlay *");
  overlayElements.forEach((elem) => {
    const htmlElem = elem as HTMLElement;
    htmlElem.style.left = htmlElem.dataset.level ?? "0";
  });

  const skillBars = document.querySelectorAll(".skill__bar");
  skillBars.forEach((skillBar) => {
    const htmlSkillBar = skillBar as HTMLElement;
    htmlSkillBar.style.width = htmlSkillBar.dataset.level ?? "0";
  });
};

export default setupSkills;
