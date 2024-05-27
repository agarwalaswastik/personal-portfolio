import "modern-normalize";
import "/styles/base.css";
import "/styles/components/header.css";
import "/styles/components/mobile-nav.css";
import "/styles/components/home.css";
import "/styles/components/about.css";
import "/styles/components/projects.css";
import "/styles/components/skills.css";
import "/styles/components/contact.css";
import "/styles/utils.css";

import setupHeader from "./header";
import setupMobileNav from "./mobile-nav";
import setupHome from "./home";
import setupSkills from "./skills";

setupHeader();
setupMobileNav();
setupHome();
setupSkills();