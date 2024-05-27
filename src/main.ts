import "modern-normalize";
import "/styles/base.css";
import "/styles/components/header.css";
import "/styles/components/hero.css";
import "/styles/components/about.css";
import "/styles/components/projects.css";
import "/styles/components/skills.css";
import "/styles/components/contact.css";
import "/styles/utils.css";

import listenProgressbarUpdate from "./header";
import setSkillLevels from "./skills";

listenProgressbarUpdate();
setSkillLevels();