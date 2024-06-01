function debounce<T extends Function>(callback: T, delay: number) {
  let timeout = 0;
  let callable = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
  return <T>(<any>callable);
}

function setupHeader() {
  const header = document.querySelector(".header")! as HTMLElement;
  const progressBar = document.querySelector(".header__progress-bar")! as HTMLElement;

  const debouncedScrollUpdate = debounce(() => {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (scrollY <= 10) header.style.transform = "translateY(-100%)";
    else header.style.transform = "translateY(0)";

    progressBar.style.width = `${(scrollY / (fullHeight - innerHeight)) * 100}%`;
  }, 1);

  window.addEventListener("scroll", debouncedScrollUpdate);
  window.addEventListener("load", debouncedScrollUpdate);
}

export default setupHeader;
