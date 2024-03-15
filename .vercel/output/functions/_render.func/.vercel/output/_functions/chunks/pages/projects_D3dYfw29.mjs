import { d as createAstro, e as createComponent, r as renderTemplate, i as renderComponent, j as Fragment } from '../astro_Cn1-UY-y.mjs';
import 'kleur/colors';
import { g as $$Hero, h as $$Content, i as $$Header, d as $$PageLayout } from './about_ClYjhyIr.mjs';

const $$Astro = createAstro("https://furkaneyazici.netlify.app");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  const metadata = {
    title: "Furkan's Projects"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { ...metadata }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Hero", $$Hero, { "title": "Projects", "subtitle": "Here are some of the projects I have worked on. I am always looking for new projects to work on, so if you have an idea, feel free to contact me!", "callPageName": "Contact", "callPagePath": "/#contact" })} ${renderComponent($$result2, "Content", $$Content, {})} ${renderComponent($$result2, "Content", $$Content, { "title": "Upcoming Projects", "subtitle": "Here are some of the projects that I am currently working on. They are not yet ready for public use, but I will be sharing them here once they are ready." }, { "default": ($$result3) => renderTemplate`  ` })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Header", $$Header, { "links": [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Projects", href: "#" },
    { text: "Blog", href: "/blog" }
  ], "isSticky": true, "showToggleTheme": true })} ` })}` })}`;
}, "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/projects.astro", void 0);

const $$file = "/home/themanyface/Projects/personal_website/mywebsite/furkaneyazici2/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
