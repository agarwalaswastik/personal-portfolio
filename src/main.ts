import "modern-normalize";
import "/styles/base.css";
import "/styles/components/header.css";
import "/styles/components/mobile-nav.css";
import "/styles/components/home.css";
import "/styles/components/about.css";
import "/styles/components/projects.css";
import "/styles/components/skills.css";
import "/styles/components/contact.css";
import "/styles/components/footer.css";
import "/styles/utils.css";

import setupHeader from "./header";
import setupMobileNav from "./mobile-nav";
import setupSkills from "./skills";

setupHeader();
setupMobileNav();
setupSkills();

import("./home/home")
  .then((setupHome) => {
    setupHome.default();
  })
  .catch(() => {
    const loading = document.querySelector(".home__animation-loading")! as HTMLElement;
    const fallback = document.querySelector(".home__fallback")! as HTMLElement;
    loading.style.display = "none";
    fallback.style.display = "flex";
  });
