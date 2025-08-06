# Querysharp MCP Server

[![npm version](https://badge.fury.io/js/querysharp-mcp.svg)](https://badge.fury.io/js/querysharp-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/querysharp-mcp.svg)](https://nodejs.org/)

A Model Context Protocol (MCP) server for [Querysharp](https://querysharp.com), enabling AI assistants to help you analyze and optimize your PostgreSQL database performance directly from your code editor.

## 🚀 Quick Start

### Setup in Cursor/Claude

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "querysharp": {
      "command": "npx",
      "args": ["querysharp-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

For global installation:

```json
{
  "mcpServers": {
    "querysharp": {
      "command": "querysharp-mcp",
      "args": ["--api-key", "YOUR_API_KEY"]
    }
  }
}
```

## 🎯 What It Does

Querysharp is a database performance monitoring tool that identifies potential performance issues and suggests optimizations. This MCP server allows AI assistants like Claude (in Cursor) to:

- 🔍 **Get your database projects** - Retrieve all monitored databases
- 🛠️ **Fetch performance fixes** - Get specific optimization recommendations  
- 🚀 **Apply optimizations** - Let AI help implement the suggested fixes

## 🛠️ Features

### Available Tools

- **`get_projects`** - Lists all your Querysharp projects with their database tables
- **`get_database_fixes`** - Retrieves performance fixes for a specific project, including:
  - Missing index recommendations with SQL commands
  - Query rewrite suggestions for better performance
  - Severity levels (Low, Medium, High, Critical)

## 🔧 Getting Your API Key

1. Sign up at [Querysharp](https://querysharp.com)
2. Add your PostgreSQL database for monitoring  
3. Get your API key from the dashboard

## 💬 Usage Examples

Once configured, you can ask your AI assistant questions like:

- *"What database performance issues do I have?"*
- *"Show me the missing indexes for my production database"*
- *"Help me optimize my slow queries"*
- *"Fix my database performance problems"*

### Example Interaction

```
You: "Help me fix my database performance"

AI: Let me check your Querysharp projects and get the performance fixes...

[AI calls get_projects tool]
[AI calls get_database_fixes tool for your project]

AI: I found 3 performance issues in your database:

1. **Missing Index on users.email** (HIGH severity)
   - Table: users
   - Suggested SQL: `CREATE INDEX idx_users_email ON users(email);`
   
2. **Slow JOIN Query** (MEDIUM severity)  
   - Original: `SELECT * FROM orders JOIN users ON...`
   - Optimized: `SELECT o.id, u.name FROM orders o JOIN users u ON...`

Would you like me to help you implement these fixes?
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Scope

**What this MIT license covers:**
- ✅ This MCP server code and implementation
- ✅ All code in this repository

**What this license does NOT cover:**
- ❌ Querysharp's main database monitoring service
- ❌ Querysharp's proprietary algorithms and analysis
- ❌ Querysharp's web dashboard and API backend
- ❌ Any Querysharp intellectual property
- ❌ Anything outside of this repository

**Note:** This MCP server is a client that connects to Querysharp's API service. You still need a valid Querysharp account and API key to use this tool. Querysharp's terms of service apply to your use of their API and service.

## 🔗 Links

- 🌐 **Website**: [querysharp.com](https://querysharp.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/WeePulse/querysharp-mcp/issues)
- 💬 **Support**: thomas@weepulse.fr

## 🏷️ Keywords

`mcp`, `model-context-protocol`, `database`, `performance`, `postgresql`, `querysharp`, `optimization`, `sql`, `missing-indexes`, `query-optimization`, `cursor`, `claude` 