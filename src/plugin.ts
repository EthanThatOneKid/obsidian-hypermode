import { Notice, Plugin } from "obsidian";
import {
  clientStubFromCloudEndpoint,
  DgraphClient,
  Operation,
} from "dgraph-js";
import {
  DEFAULT_SETTINGS,
  ObsidianHypermodePluginSettings,
  ObsidianHypermodeSettingTab,
} from "./settings";

export class ObsidianHypermodePlugin extends Plugin {
  public settings: ObsidianHypermodePluginSettings;
  private dgraphClient: DgraphClient;

  public async onload() {
    this.addSettingTab(new ObsidianHypermodeSettingTab(this.app, this));

    await this.loadSettings();
    this.dgraphClient = new DgraphClient(clientStubFromCloudEndpoint(
      this.settings.dgraphCloudEndpoint,
      this.settings.dgraphCloudApiKey,
    ));

    const schemaPath = `${this.manifest.dir}/src/dgraph.schema`;
    const schemaString = await this.app.vault.adapter.read(schemaPath);

    // TODO: Write data to dgraph.

    // https://github.com/dgraph-io/dgraph-js?tab=readme-ov-file#altering-the-database
    const op = new Operation();
    op.setSchema(schemaString);
    op.setDropAll(true);
    await this.dgraphClient.alter(op);

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
