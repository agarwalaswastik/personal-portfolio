function debounce<T extends Function>(callback: T, delay: number) {
  let timeout = 0;
  let callable = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
  return <T>(<any>callable);
}

function setupHeader() {
  const progressBar = document.querySelector(".header__progress-bar")!;
  if (!(progressBar instanceof HTMLElement)) return;

  const debouncedScrollUpdate = debounce(() => {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    progressBar.style.width = `${(scrollY / (fullHeight - innerHeight)) * 100}%`;
  }, 1);

  window.addEventListener("scroll", debouncedScrollUpdate);
  window.addEventListener("load", debouncedScrollUpdate);
}

export default setupHeader;
