import { App, Modal, Notice, Plugin, Setting } from "obsidian";

// The following example reads the content of all Markdown files in the Vault and returns the average document size.
export default class ExamplePlugin extends Plugin {
  public onload() {
    this.addRibbonIcon("info", "Calculate average file length", async () => {
      const fileLength = await this.averageFileLength();
      new Notice(`The average file length is ${fileLength} characters.`);
    });
  }

  public async averageFileLength(): Promise<number> {
    const { vault } = this.app;
    const fileContents: string[] = await Promise.all(
      vault.getMarkdownFiles().map((file) => vault.cachedRead(file)),
    );

    let totalLength = 0;
    fileContents.forEach((content) => totalLength += content.length);
    return totalLength / fileContents.length;
  }
}

// TODO: Modal takes graph database connection URI by user input and
// syncs the graph database with the Obsidian vault.
// https://docs.obsidian.md/Plugins/User+interface/Modals#Accept+user+input

export class ExampleModal extends Modal {
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
