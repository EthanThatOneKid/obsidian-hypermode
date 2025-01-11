import { Notice, Plugin } from "obsidian";
import { clientStubFromCloudEndpoint, DgraphClient } from "dgraph-js";
import {
  DEFAULT_SETTINGS,
  ObsidianHypermodePluginSettings,
  ObsidianHypermodeSettingTab,
} from "./settings";

export class ObsidianHypermodePlugin extends Plugin {
  public settings: ObsidianHypermodePluginSettings;

  public async onload() {
    await this.loadSettings();

    this.addRibbonIcon("info", "WIP", async () => {
      console.log({ settings: this.settings });

      const clientStub = clientStubFromCloudEndpoint(
        this.settings.dgraphCloudEndpoint,
        this.settings.dgraphCloudApiKey,
      );
      const dgraphClient = new DgraphClient(clientStub);

      const response = await dgraphClient.newTxn().query(
        `{ persistedQueries(func: type(dgraph.graphql.persisted_query)) { uid dgraph.graphql.p_query } }`,
      );
      const result = response.getJson();
      if (result.persistedQueries.length > 0) {
        new Notice("Dgraph client is working as expected.");
      } else {
        new Notice("Dgraph client query returned no results.");
      }
    });

    this.addSettingTab(new ObsidianHypermodeSettingTab(this.app, this));
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
