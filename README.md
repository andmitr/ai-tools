
# AI Tools
A custom set of agent profiles, skills, slash commands, rules (such as AGENTS.md), and plugins for AI tools like Claude, OpenCode, and others.

## Overview
This setup implements a skill-first agent architecture: three primary agents with a centralized skill library instead of multiple specialized agents and sub-agents. Multi-agent systems with numerous specialized agents showed worse results due to redundant handoffs and context fragmentation. The current approach is simpler and more effective. `Agent` is the universal primary agent with all system prompt and personalization behavior rules embedded directly. The `Coder` agent is used for development tasks and the `SMM` agent (Social Media Marketing) for social media and working with content like posts and articles. Each has its own system prompt and temperature parameter suited to its domain.

This repository focuses on customization. See the [OpenCode documentation](https://opencode.ai/docs) for installation and basic OpenCode configuration.

### Project structure:
- `agents/` - custom agent profiles
- `brand-theme/` - personal brand design system following Design Tokens 2025.10 spec
- `commands/` - slash command prompts
- `plugin/` - OpenCode plugins
- `skills/` - skills library
- `AGENTS.md` - shared generic rules (applies to all agents)
- `opencode.json` - main OpenCode configuration
- `personalization.md` - user-specific behavior/workflow rules (ignored by git)
- `personalization.md.example` - template example of user-specific rules
- `tui.json` - custom keybinds

## ⚠️ Configuration Notes
- `opencode.json`: contains the MCP server `Context7` configuration using a Context7 API key, which is read from the `CONTEXT7_API_KEY` environment variable. [Create a Context7 API key](https://context7.com/dashboard) (available after sign-up)
- `instructions: ["personalization.md"]` field in `opencode.json`: used to load user-specific rules from `personalization.md`, highly specific and not published to GitHub, if you don't need these rules - remove the `instructions` field or create your own `personalization.md`
- `brand-theme/`: personal brand design system following Design Tokens 2025.10 spec (JSON schema: https://www.designtokens.org/schemas/2025.10/format.json) with live HTML preview. `personalization.md` is configured to use this color scheme for UI in created projects, if you want to use your own brand theme, create it using your LLM (for example, following the Design Tokens specification) and place it in the `brand-theme/` folder.
- `skills/`: centralized in `~/.config/opencode/skills`, but skills from other directories used by Claude and other multi-agent systems will also work, the directory includes my custom skills, but most are collected from resources like [AI Templates](https://www.aitmpl.com/) and [Skills](https://www.skills.sh/), some are customized
- `plugin/skill-reminder.js`: custom plugin for OpenCode only, appends a reminder to scan available skills whenever a user message is processed, if such reminders seem excessive or unnecessary, simply delete this file

## License

My original contributions in this repository are MIT Licensed. See [LICENSE](LICENSE) for details.

> This repository is a curated collection. Most skills in `skills/` were sourced from [skills.sh](https://www.skills.sh/) and [aitmpl.com](https://www.aitmpl.com/) and remain under their original authors' licenses. Some skills include their own `LICENSE.txt` files which take precedence for those directories. The MIT license above applies only to original work authored by Andrew Dmitriev.
