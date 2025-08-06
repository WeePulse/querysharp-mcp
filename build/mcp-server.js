import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { QuerysharpApiClient } from './api-client.js';
import { QueryFixSeverity, QueryFixType } from './types.js';
export class QuerysharpMcpServer {
    server;
    apiClient;
    constructor(config) {
        this.server = new Server({
            name: 'querysharp-mcp',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.apiClient = new QuerysharpApiClient(config);
        this.setupToolHandlers();
    }
    setupToolHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'get_projects',
                        description: 'Get all available projects for which there are database improvements fixes available',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                            required: [],
                        },
                    },
                    {
                        name: 'get_database_fixes',
                        description: 'Get available database improvement / performance fixes for a specific project',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                projectUuid: {
                                    type: 'string',
                                    description: 'The UUID of the project to get fixes for',
                                },
                            },
                            required: ['projectUuid'],
                        },
                    },
                ],
            };
        });
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                switch (request.params.name) {
                    case 'get_projects': {
                        const projects = await this.apiClient.getProjects();
                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Found ${projects.length} Querysharp projects:\n\n${projects
                                        .map((project, index) => `${index + 1}. **${project.name}** (UUID: ${project.uuid})\n   Tables: ${project.tableNames.join(', ')}`)
                                        .join('\n\n')}`,
                                },
                            ],
                        };
                    }
                    case 'get_database_fixes': {
                        const projectUuid = request.params.arguments?.projectUuid;
                        if (!projectUuid) {
                            throw new Error('projectUuid is required');
                        }
                        const fixes = await this.apiClient.getDatabaseFixes(projectUuid);
                        if (fixes.fixes.length === 0) {
                            return {
                                content: [
                                    {
                                        type: 'text',
                                        text: 'No database performance fixes available for this project. Your database is performing well!',
                                    },
                                ],
                            };
                        }
                        const fixesText = fixes.fixes
                            .map((fix, index) => {
                            let fixDetails = '';
                            if (fix.queryFixType === QueryFixType.INDEX_MISSING &&
                                fix.guessMissingIndex) {
                                fixDetails = `**Missing Index Fix:**
- Table: ${fix.guessMissingIndex.qsTableName}
- Suggested Index: ${fix.guessMissingIndex.indexName}
- SQL: \`${fix.guessMissingIndex.indexDefinition}\``;
                            }
                            else if (fix.queryFixType === QueryFixType.QUERY_REWRITE &&
                                fix.guessQueryRewrite) {
                                fixDetails = `**Query Rewrite Fix:**
- Original Query: \`${fix.guessQueryRewrite.originalQuery}\`
- Optimized Query: \`${fix.guessQueryRewrite.fixedQuery}\``;
                            }
                            return `## Fix ${index + 1}: ${fix.fixDescription}

**Severity:** ${this.getSeverityEmoji(fix.severity)} ${fix.severity}
**Type:** ${fix.queryFixType}
**Created:** ${new Date(fix.createdAt).toLocaleDateString()}

${fixDetails}`;
                        })
                            .join('\n\n---\n\n');
                        return {
                            content: [
                                {
                                    type: 'text',
                                    text: `Found ${fixes.fixes.length} database performance fixes:\n\n${fixesText}`,
                                },
                            ],
                        };
                    }
                    default:
                        throw new Error(`Unknown tool: ${request.params.name}`);
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${errorMessage}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    getSeverityEmoji(severity) {
        switch (severity) {
            case QueryFixSeverity.TO_CONSIDER:
                return '🟢';
            case QueryFixSeverity.IMPORTANT:
                return '🟡';
            case QueryFixSeverity.CRITICAL:
                return '🔴';
            default:
                return '⚪';
        }
    }
    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Querysharp MCP server started');
    }
}
//# sourceMappingURL=mcp-server.js.map