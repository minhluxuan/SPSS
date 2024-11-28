import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises'; // Use the Promise-based API

@Injectable()
export class ConfigService {
    private configData: Record<string, any>; // Use plain object for simplicity
    private readonly filePath = 'src/common/resources/config.json';

    constructor() {
        this.loadConfig().catch(error => {
            console.error('Failed to load config:', error.message);
        });
    }

    private async loadConfig() {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            this.configData = JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error reading config file at ${this.filePath}:`, error.message);
            this.configData = {}; // Fallback to empty config if file read fails
        }
    }

    async updateDefaultGrantedPages(pages: number) {
        this.configData['defaultGrantedPages'] = pages;
        await this.saveConfig();
        return this.configData;
    }

    getAll() {
        return this.configData;
    }

    async getDefaultGrantedPages() {
        return this.configData['defaultGrantedPages'];
    }

    private async saveConfig() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.configData, null, 2));
        } catch (error) {
            console.error(`Error saving config file at ${this.filePath}:`, error.message);
        }
    }
}
