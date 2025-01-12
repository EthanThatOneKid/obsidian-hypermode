import { Client, createClient } from "graphql-http";
import { Notice, Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  ObsidianHypermodePluginSettings,
  ObsidianHypermodeSettingTab,
} from "./settings";

export class ObsidianHypermodePlugin extends Plugin {
  public settings: ObsidianHypermodePluginSettings;
  public gqlClient: Client;

  public async onload() {
    this.addSettingTab(new ObsidianHypermodeSettingTab(this.app, this));

    await this.loadSettings();

    // TODO: Write data to modus.
    // this.gqlClient = createClient({
    // https://github.com/graphql/graphql-http?tab=readme-ov-file#use-the-client
    // });

    this.addRibbonIcon("info", "WIP", async () => {
      console.log({ settings: this.settings });
      new Notice("WIP");
    });
  }

  public async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  public async saveSettings() {
    await this.saveData(this.settings);
  }
}

/*
export class ObsidianHypermodePluginModal extends Modal {
  constructor(app: App, onSubmit: (result: string) => void) {
    super(app);
    this.setTitle("What's your name?");

    let name = "";
    new Setting(this.contentEl)
      .setName("Name")
      .addText((text) =>
        text.onChange((value) => {
          name = value;
        })
      );

    new Setting(this.contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            onSubmit(name);
          })
      );
  }
}
*/

/*
function convertTFileToTFileRow(file: TFile): TFileRow {
  return {
    path: file.path,
    name: file.name,
    parentPath: file.parent?.path ?? null,
    parentName: file.parent?.name ?? null,
    basename: file.basename,
    extension: file.extension,
    ctime: file.stat.ctime,
    mtime: file.stat.mtime,
    size: file.stat.size,
  };
}

export interface TFileRow {
  path: string;
  name: string;
  parentPath: string | null;
  parentName: string | null;
  basename: string;
  extension: string;
  ctime: number;
  mtime: number;
  size: number;
}
*/
