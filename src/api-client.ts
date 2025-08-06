import {
  GetDatabaseFixesDtoOut,
  GetProjectsDtoOut,
  getDatabaseFixesDtoOutSchema,
  getProjectsDtoOutSchema,
  QuerysharpConfig,
} from './types.js';

export class QuerysharpApiClient {
  private readonly baseUrl = 'https://api.querysharp.com';
  private apiKey: string;

  constructor(config: QuerysharpConfig) {
    this.apiKey = config.apiKey;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
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
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to call ${endpoint}: ${error.message}`);
      }
      throw new Error(`Failed to call ${endpoint}: Unknown error`);
    }
  }

  async getProjects(): Promise<GetProjectsDtoOut> {
    const data = await this.makeRequest<GetProjectsDtoOut>('/mcp/get-projects');

    // Validate the response using Zod schema
    try {
      return getProjectsDtoOutSchema.parse(data);
    } catch (error) {
      throw new Error(
        `Invalid response format from get-projects endpoint: ${error}`,
      );
    }
  }

  async getDatabaseFixes(projectUuid: string): Promise<GetDatabaseFixesDtoOut> {
    const data = await this.makeRequest<GetDatabaseFixesDtoOut>(
      `/mcp/database/${projectUuid}/get-database-fixes`,
    );

    // Validate the response using Zod schema
    try {
      return getDatabaseFixesDtoOutSchema.parse(data);
    } catch (error) {
      throw new Error(
        `Invalid response format from get-database-fixes endpoint: ${error}`,
      );
    }
  }
}
