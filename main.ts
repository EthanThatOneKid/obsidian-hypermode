import { Notice, Plugin } from "obsidian";

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
