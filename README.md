# Prompt-Engineering Workstation 🚀

A unified command-line workstation that orchestrates multi-model prompt workflows—helping product teams rapidly draft UI/UX specs, generate style-guides, and automate media creation.

## Features

1. **Multi-Model Orchestration** – Chains Anthropic Claude (requirements), OpenAI GPT-4 (detailed spec), and ULM (vision/media) models.
2. **Prompt Template Registry** – Re-usable, parameterised templates stored in YAML or Python.
3. **Automated Artifacts** – Outputs Markdown specs, JSON tokens, and media stubs into `artifacts/` folder.
4. **Typer CLI + Rich TUI** – One-command workflow: `PYTHONPATH=$(pwd)/src python -m workstation.cli run-project darzabi`.
5. **CI-Friendly** – Generated files can be auto-committed for review; just set `WORKSTATION_GIT_COMMIT=true`.

## Quick Start

```bash
# 1. Install deps (ideally in a virtualenv)
pip install -r requirements.txt

# 2. Add your API keys (or skip to run in stub-mode)
export OPENAI_API_KEY=sk-...
export CLAUDE_API_KEY=anthropic-...

# 3. Run the full workflow for a project codename
PYTHONPATH=$(pwd)/src python -m workstation.cli run-project darzabi
```

The command will:

1. Ask Claude to gather requirements for *darzabi*.
2. Feed those requirements into GPT-4 to craft a detailed spec with Tailwind + JSX snippets.
3. (Stub) Call ULM to propose media assets.
4. Save artifacts into `artifacts/` and print a colourful summary to the terminal.

## Environment Variables

| Var | Description |
|-----|-------------|
| `OPENAI_API_KEY` | Your OpenAI key (GPT-4, GPT-4o…) |
| `CLAUDE_API_KEY` | Anthropic Claude key |
| `ULM_API_KEY` | Placeholder for future ULM SDK |
| `WORKSTATION_OUTPUT_DIR` | Folder for artifacts (default `artifacts/`) |
| `WORKSTATION_GIT_COMMIT` | `true` to auto-commit generated files |

> 📝 If no keys are set, the workstation runs in *stub* mode—useful for CI or demos.

## Roadmap

- [ ] Add real ULM SDK integration for image+vision workflows
- [ ] Interactive prompt tweaking REPL
- [ ] Lint & accessibility audit hooks (WCAG)
- [ ] Web UI built with Next.js & shadcn/ui

---

Made with ❤️ by the Prompt Engineering team. 