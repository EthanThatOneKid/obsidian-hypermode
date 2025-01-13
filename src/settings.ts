import { App, PluginSettingTab, Setting } from "obsidian";
import { ObsidianModusPlugin } from "./plugin";

export interface ObsidianModusPluginSettings {
  gqlEndpoint: string;
}

export const DEFAULT_SETTINGS: Partial<ObsidianModusPluginSettings> = {
  gqlEndpoint: "",
};

export class ObsidianModusSettingTab extends PluginSettingTab {
  public constructor(app: App, private plugin: ObsidianModusPlugin) {
    super(app, plugin);
  }

  public display(): void {
    this.containerEl.empty();

    new Setting(this.containerEl)
      .setName("GraphQL Endpoint")
      .setDesc("Endpoint for your GraphQL server")
      .addText((text) =>
        text
          .setPlaceholder("http://localhost:8080/graphql")
          .setValue(this.plugin.settings.gqlEndpoint)
          .onChange(async (value) => {
            this.plugin.settings.gqlEndpoint = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
