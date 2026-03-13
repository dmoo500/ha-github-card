# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest  | ✅        |
| < 0.0.3 | ❌        |

## Reporting a Vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report privately via [GitHub Security Advisories](https://github.com/dmoo500/ha-github-card/security/advisories/new) or by emailing the maintainer directly.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

You will receive a response within **some days**. If confirmed, a fix will be released as soon as possible and credited to you (unless you prefer anonymity).

## Scope

Relevant areas for this project:

- **XSS via entity attributes** — card renders data from Home Assistant entity attributes into the DOM
- **Inline style injection** — `slot_colors` config values are written into inline `style` attributes
- **Dependency vulnerabilities** — third-party packages (`lit`, `vite`, etc.)
- **External image loading** — avatar URLs are loaded from `avatars.githubusercontent.com`

## Out of Scope

- Vulnerabilities in Home Assistant core or the GitHub integration itself
- Issues requiring physical access to the HA instance
- Social engineering attacks
