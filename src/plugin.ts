import { Notice, Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  ObsidianModusPluginSettings,
  ObsidianModusSettingTab,
} from "./settings";
import { fetchAddFiles, fetchAlterSchema } from "./modus";
import { fetchQueryFiles } from "./modus/query-files";

export class ObsidianModusPlugin extends Plugin {
  public settings: ObsidianModusPluginSettings;

  public async onload() {
    await this.loadSettings();

    // TODO: Write data to modus.
    await fetchAlterSchema();

    const result0 = await fetchAddFiles({
      files: [
        {
          uid: "0123456789",
          path: "./example.md",
          fileName: "example.md",
          fileExtension: "md",
          modifiedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          fileContent: "# Example\n\nThis is an example.\n",
          dType: ["File"],
        },
      ],
    });
    console.log({ result0 });

    const result1 = await fetchQueryFiles();
    console.log({ result1 });

    await this.addSettingTab(new ObsidianModusSettingTab(this.app, this));
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
