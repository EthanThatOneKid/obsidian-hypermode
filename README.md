# obsidian-hypermode

Hypermode integrated with
[Obsidian API](https://github.com/obsidianmd/obsidian-api).

## Developing

This repository was generated from
[Obsidian's sample plugin template](https://github.com/obsidianmd/obsidian-sample-plugin).

- Clone your repository to a local development folder. For convenience, you can
  place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `deno task prebuild` in the command line under your
  repository folder.
- Run `deno task dev` to compile run the plugin in watch mode.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be
  automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `deno task outdated` in the command line
  under your repository folder.
- Format your code with `deno fmt`.
- Lint your code with Deno and Eslint via `deno task lint`.
- [Releasing new releases](https://github.com/obsidianmd/obsidian-sample-plugin?tab=readme-ov-file#releasing-new-releases)

## Adding your plugin to the community plugin list

- Check the
  [plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines).
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add
  your plugin.

## How to use

- Clone this repo.
- Make sure [Deno](https://deno.com) is installed.
- `deno task prebuild` to install dependencies.
- `deno task dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault
  `VaultFolder/.obsidian/plugins/your-plugin-id/`.

---

Developed during the
[Hypermode Knowledge Graph + AI Challenge](https://hypermode-knowledge-graph-ai.devpost.com/)
by [**@EthanThatOneKid**](https://github.com/EthanThatOneKid)
