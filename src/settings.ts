import { App, PluginSettingTab, Setting } from "obsidian";
import { ObsidianHypermodePlugin } from "./plugin";

export interface ObsidianHypermodePluginSettings {
  dgraphCloudEndpoint: string;
  dgraphCloudApiKey: string;
}

export const DEFAULT_SETTINGS: Partial<ObsidianHypermodePluginSettings> = {
  dgraphCloudEndpoint: "",
  dgraphCloudApiKey: "",
};

export class ObsidianHypermodeSettingTab extends PluginSettingTab {
  public constructor(app: App, private plugin: ObsidianHypermodePlugin) {
    super(app, plugin);
  }

  public display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("Dgraph Cloud Endpoint")
      .setDesc("Endpoint for Dgraph Cloud")
      .addText((text) =>
        text
          .setPlaceholder("https://cloud.dgraph.io/graphql")
          .setValue(this.plugin.settings.dgraphCloudEndpoint)
          .onChange(async (value) => {
            this.plugin.settings.dgraphCloudEndpoint = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(this.containerEl)
      .setName("Dgraph Cloud API Key")
      .setDesc("API key for Dgraph Cloud")
      .addText((text) =>
        text
          .setPlaceholder("<api-key>")
          .setValue(this.plugin.settings.dgraphCloudApiKey)
          .onChange(async (value) => {
            this.plugin.settings.dgraphCloudApiKey = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
