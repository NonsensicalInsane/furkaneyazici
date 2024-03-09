import { getAsset } from './utils/permalinks';

export const headerData = {

};

export const footerData = {
  
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/furkaneyazici', target:"_blank" },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/nonsensicalinsane' , target:"_blank"},
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') , target:"_blank"},
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/nonsensicalinsane' , target:"_blank"},
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/nonsensicalinsane' , target:"_blank"},
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:yazici.furkan@proton.me', target:"_blank"},
    { ariaLabel: 'Upwork', icon: 'tabler:brand-upwork', href: 'https://www.upwork.com/freelancers/~01ae41556331664a51', target:"_blank" },
    { ariaLabel: 'Youtube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@furkaneyazici', target:"_blank"}
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm"><img src="/src/assets/images/icons/logo.ico"/></span>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/nonsensicalinsane "> The FEY</a>.
  `,
};
