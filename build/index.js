#!/usr/bin/env node
import { Command } from 'commander';
import { QuerysharpMcpServer } from './mcp-server.js';
const program = new Command();
program
    .name('querysharp-mcp')
    .description('MCP server for Querysharp database performance monitoring')
    .version('1.0.0')
    .requiredOption('-k, --api-key <key>', 'Querysharp API key')
    .action(async (options) => {
    try {
        const config = {
            apiKey: options.apiKey,
        };
        const server = new QuerysharpMcpServer(config);
        await server.start();
    }
    catch (error) {
        console.error('Failed to start Querysharp MCP server:', error);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=index.js.map