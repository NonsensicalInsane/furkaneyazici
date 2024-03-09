import { getAsset } from './utils/permalinks';

export const headerData = {
  // links: [
  //   {
  //     text: 'Homes',
  //   },
  //   {
  //     text: 'Pages',
  //   },
  //   {
  //     text: 'Landing',

  //   },
  //   {
  //     text: 'Blog',
  //     href: '/blog'
  //   },
  //   {
  //     text: 'Widgets',
  //     href: '#',
  //   },
  // ],
};

export const footerData = {
  
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/furkaneyazici' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/nonsensicalinsane' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/nonsensicalinsane' },
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/nonsensicalinsane' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm"><img src="/src/assets/images/icons/logo.ico"/></span>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/nonsensicalinsane "> The FEY</a>.
  `,
};
