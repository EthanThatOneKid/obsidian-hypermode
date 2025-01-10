import { Notice, Plugin } from "obsidian";
import { clientStubFromCloudEndpoint, DgraphClient } from "dgraph-js";
import {
  DEFAULT_SETTINGS,
  ObsidianHypermodePluginSettings,
  ObsidianHypermodeSettingTab,
} from "./settings";

export class ObsidianHypermodePlugin extends Plugin {
  public settings: ObsidianHypermodePluginSettings;

  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("info", "WIP", async () => {
      const clientStub = clientStubFromCloudEndpoint(
        this.settings.dgraphCloudEndpoint,
        this.settings.dgraphCloudApiKey,
      );
      const dgraphClient = new DgraphClient(clientStub);

      // TODO: Set up dgraph schema.
      // https://github.com/dgraph-io/dgraph-js?tab=readme-ov-file#using-a-client
      //

      // TODO: Test that the dgraph client works.
      await dgraphClient.newTxn().query(`{ me(func: uid(0x1)) { name } }`);

      new Notice("Success");
    });

    this.addSettingTab(new ObsidianHypermodeSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
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
