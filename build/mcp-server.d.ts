import { QuerysharpConfig } from './types.js';
export declare class QuerysharpMcpServer {
    private server;
    private apiClient;
    constructor(config: QuerysharpConfig);
    private setupToolHandlers;
    private getSeverityEmoji;
    start(): Promise<void>;
}
//# sourceMappingURL=mcp-server.d.ts.map