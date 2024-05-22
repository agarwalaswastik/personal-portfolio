const setSkillLevels = () => {
  const skillBars = document.querySelectorAll(".skill__bar");
  skillBars.forEach((skillBar) => {
    if (skillBar instanceof HTMLElement) {
      skillBar.style.width = skillBar.dataset.level ?? "0";
    }
  });
};

export default setSkillLevels;
