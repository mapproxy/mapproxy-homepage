// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MapProxy',
  tagline: 'Speed up your map services',
  url: 'https://mapproxy.org',
  baseUrl: '/mapproxy-homepage/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mapproxy',
  projectName: 'mapproxy',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true
      },
      navbar: {
        title: 'MapProxy',
        logo: {
          alt: 'MapProxy logo',
          src: 'img/mapproxy-logo.png',
        },
        items: [
          {
            to: 'https://mapproxy.github.io/mapproxy',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/download',
            position: 'left',
            label: 'Download',
          },
          {
            to: '/development',
            position: 'left',
            label: 'Development',
          },
          {
            to: '/support',
            position: 'left',
            label: 'Support',
          },
          {
            to: '/resources',
            position: 'left',
            label: 'Resources',
          },
          {
            href: 'https://github.com/mapproxy/mapproxy',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'light',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} MapProxy. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github
      },
    }),
};

export default config;
