# TIL Repository Context

## Repository Structure

This is a TIL (Today I Learned) repository located at `/home/owen/文档/github/til/cc/`.

### Directory Organization

```
cc/
├── hack/           # General hacking/tech notes and API discoveries
├── docker/         # Docker-related tips and configurations
├── php/            # PHP-specific tutorials and problem solutions
│   └── laravel/    # Laravel framework specific entries
├── ubuntu/         # Ubuntu/Linux system tips and commands
├── nodejs/         # Node.js related tutorials and snippets
└── .claude/        # Claude Code configuration and skills
    └── skills/     # Custom skills for this repository
```

## File Naming Conventions

- **Lowercase** with **hyphens** for spaces
- Descriptive and specific (not generic names)
- Examples: `sisyphe_daily_calendar_list_api.md`, `docker-biuld-proxy.md`, `socket-io-eio-version.md`

## Writing Style

1. **Title Format**: H2 headers (`## Title`)
2. **Concise and practical**: Focus on actionable information
3. **Code blocks**: Use triple backticks with language identifier
4. **Problem-solution oriented**: Many entries document specific problems and solutions
5. **Mixed language**: Content can be in Chinese or English

## Available Skills

### `/save-to-til`
Creates new TIL entries following repository conventions. Automatically analyzes existing patterns before creating new entries.

Usage: Simply ask to "add a TIL about [topic]" or "save this to my TIL"

## Git Commit Message Format

All commits must follow this concise format:

```
<topic>: <brief description>
```

- **topic**: The category directory (e.g., `golang`, `docker`, `react`, `php`)
- **brief description**: What was added/changed, in lowercase

Examples:
- `golang: add defer usage notes`
- `docker: document network mode firewall setup`
- `react: fix useEffect hook pattern`
- `php: explain array_merge vs + operator`

**Rules:**
- One-line message only (no body)
- Lowercase topic and description
- Use colon and space after topic
- Be concise but descriptive

## Readme Update Convention

When creating a **new category folder**, update `readme.md` to add the new section in the directory listing. Follow the existing `<details>` format:

```markdown
<details>
<summary>category-name</summary>

- [`file-name.md`](./category-name/file-name.md): Brief description.

</details>
```

**Rules:**
- Only update readme.md when creating a new category folder
- Keep descriptions brief (one line)
- Use lowercase summary for consistency
- Place new categories alphabetically
