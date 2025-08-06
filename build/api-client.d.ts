import { GetDatabaseFixesDtoOut, GetProjectsDtoOut, QuerysharpConfig } from './types.js';
export declare class QuerysharpApiClient {
    private readonly baseUrl;
    private apiKey;
    constructor(config: QuerysharpConfig);
    private makeRequest;
    getProjects(): Promise<GetProjectsDtoOut>;
    getDatabaseFixes(projectUuid: string): Promise<GetDatabaseFixesDtoOut>;
}
//# sourceMappingURL=api-client.d.ts.map