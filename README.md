<div align="center">

  <h1><img src="https://raw.githubusercontent.com/koutyuke/koutyuke/main/icons/icon.svg" width="32" align="center" alt="My Icon" /> koutyuke.dev</h1>

  <p>
    1 page personal portfolio for showing who I am, what I build, and where to find me.
  </p>

  <p>
    <a href="https://koutyuke.dev"><strong>koutyuke.dev</strong></a>
    &nbsp;&bull;&nbsp;
    <a href="./docs/README.md">Docs</a>
    &nbsp;&bull;&nbsp;
    <a href="./LICENSE">License</a>
  </p>

  <p>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-111111?style=flat" alt="MIT License"></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react&logoColor=111111" alt="React 19"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss&logoColor=ffffff" alt="Tailwind CSS v4"></a>
    <a href="https://viteplus.dev/"><img src="https://img.shields.io/badge/Vite+-toolchain-646cff?style=flat&logo=vite&logoColor=ffffff" alt="Vite+"></a>
  </p>

</div>

## About

`koutyuke.dev` is a one-page personal portfolio site for presenting the shape of `koutyuke`.

The UI is built around React components, styled with Tailwind CSS v4 and Radix Colors, and animated with Motion.dev. The floating navigation expands from a button into a menu with continuous motion. Theme switching supports `system | light | dark`, with state managed by Jotai and DOM synchronization isolated in `theme-sync.tsx`.

## Highlights

| Area                    | Detail                                                                 |
| :---------------------- | :--------------------------------------------------------------------- |
| **Single Page**         | Collects hero, about, footprints, contact, and footer into one page    |
| **Floating Navigation** | Navigation that smoothly expands from a button into a menu             |
| **Theme Switching**     | Supports `system \| light \| dark` and follows OS preferences          |
| **Component First**     | Keeps UI reviewable through React components and Storybook             |
| **Strict Tooling**      | Runs TypeScript strict, Oxlint, Oxfmt, Stylelint, and Vitest via Vite+ |

## Stack

| Layer           | Tools                                                    |
| :-------------- | :------------------------------------------------------- |
| Toolchain       | Vite+ (`vp`)                                             |
| Runtime         | Node.js v24                                              |
| Package manager | pnpm                                                     |
| UI              | React                                                    |
| Styling         | Tailwind CSS v4, `@radix-ui/colors`, `the-new-css-reset` |
| Motion          | Motion.dev                                               |
| State           | Jotai                                                    |
| Test / Catalog  | Vitest, Storybook                                        |
| Quality         | Oxfmt, Oxlint, Stylelint, Lefthook                       |
| Environment     | Nix, direnv                                              |
| Deploy          | Cloudflare Pages                                         |

## Quick Start

`node`, `pnpm`, `git`, and `nixfmt-rfc-style` are provided by the Nix shell. `vp` is not managed by Nix yet, so install it with the official installer.

```sh
curl -fsSL https://vite.plus | bash
direnv allow
vp install
vp dev
```

## Commands

Daily development tasks are routed through Vite+.

| Command            | Description                       |
| :----------------- | :-------------------------------- |
| `vp dev`           | Start the development server      |
| `vp check`         | Run format, lint, and type checks |
| `vp test`          | Run tests                         |
| `vp run css:lint`  | Lint CSS with Stylelint           |
| `vp run storybook` | Build Storybook for production    |
| `vp build`         | Create a production build         |
| `vp run deploy`    | Deploy to Cloudflare Pages        |

## Project Map

```text
src/
├── app/                         # application shell and global styles
├── entities/                    # domain data and entity UI
│   ├── footprint/               # footprint content model
│   └── profile/                 # profile model and social links UI
├── features/
│   └── theme/                   # theme state and DOM sync
├── pages/
│   └── home/                    # home page composition
├── shared/                      # shared UI primitives and utilities
└── widgets/                     # page sections and floating navigation
    ├── about/
    ├── contact/
    ├── floating-navigation/
    ├── footer/
    ├── footprints/
    └── hero/
```

## Documentation

| Document                                                                               | Description                                                        |
| :------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [docs/README.md](./docs/README.md)                                                     | Documentation index                                                |
| [docs/DESIGN.md](./docs/DESIGN.md)                                                     | Visual design, theme, motion, and accessibility principles         |
| [docs/FRONTEND.md](./docs/FRONTEND.md)                                                 | Frontend implementation and toolchain notes                        |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)                                         | Directory structure, data flow, and coding rules                   |
| [docs/presentational-container-pattern.md](./docs/presentational-container-pattern.md) | Presenter / Container Pattern responsibilities and dependency flow |

## License

MIT License. See [LICENSE](./LICENSE) for details.
