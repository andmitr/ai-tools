---
description: Auto-generate commit message and create local commit
---

Create a git commit using the following workflow:

1. Apply the commit message generation rules from ~/.config/opencode/skills/commit/SKILL.md to analyze current changes and generate a properly formatted commit message
2. Execute `git commit` with the generated message to create the actual commit
3. Do not execute `git push` - only create the local commit

Show me the generated commit message and confirm when the commit is successfully created.