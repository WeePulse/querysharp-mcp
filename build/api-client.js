import { getDatabaseFixesDtoOutSchema, getProjectsDtoOutSchema, } from './types.js';
export class QuerysharpApiClient {
    baseUrl = 'https://api.querysharp.com';
    apiKey;
    constructor(config) {
        this.apiKey = config.apiKey;
    }
    async makeRequest(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to call ${endpoint}: ${error.message}`);
            }
            throw new Error(`Failed to call ${endpoint}: Unknown error`);
        }
    }
    async getProjects() {
        const data = await this.makeRequest('/mcp/get-projects');
        // Validate the response using Zod schema
        try {
            return getProjectsDtoOutSchema.parse(data);
        }
        catch (error) {
            throw new Error(`Invalid response format from get-projects endpoint: ${error}`);
        }
    }
    async getDatabaseFixes(projectUuid) {
        const data = await this.makeRequest(`/mcp/database/${projectUuid}/get-database-fixes`);
        // Validate the response using Zod schema
        try {
            return getDatabaseFixesDtoOutSchema.parse(data);
        }
        catch (error) {
            throw new Error(`Invalid response format from get-database-fixes endpoint: ${error}`);
        }
    }
}
//# sourceMappingURL=api-client.js.map