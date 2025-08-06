# Contributing to Querysharp MCP Server

We want to make contributing to Querysharp MCP Server as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase.

## Project Structure

```
src/
├── index.ts          # CLI entry point
├── mcp-server.ts     # Core MCP server implementation
├── api-client.ts     # Querysharp API client
└── types.ts          # TypeScript types and schemas

build/                # Compiled JavaScript output
├── index.js          # Compiled CLI
├── *.d.ts           # TypeScript declarations
└── ...              # Other compiled files
```

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example:
```
feat: add support for custom severity thresholds
fix: handle network timeout errors gracefully
docs: update installation instructions
```
## Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/querysharp/querysharp-mcp/issues/new).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Provide a clear description of the problem you're trying to solve
3. Describe the solution you'd like
4. Consider alternative solutions
5. Provide additional context if helpful

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out:

- 📧 Email: support@querysharp.com
- 🐛 Issues: [GitHub Issues](https://github.com/querysharp/querysharp-mcp/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/querysharp/querysharp-mcp/discussions)

## Recognition

Contributors will be recognized in our README and release notes. Thank you for helping make Querysharp MCP Server better! 