import { getAsset } from './utils/permalinks';

export const headerData = {    
  links: [
  { text: 'Home', href: '/' },
  { text: 'About', href: '/about' },
  { text: 'Projects', href: '/projects' },
  { text: 'Blog', href: '/blog' },
]
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
    .
  `,
};
