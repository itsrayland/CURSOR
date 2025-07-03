"""Prompt template registry.

Templates can be loaded from YAML files or defined inline for common tasks.
"""
from __future__ import annotations

from pathlib import Path
from typing import Dict

import yaml

TEMPLATES_DIR = Path(__file__).parent / "templates"

# Preload YAML templates if present
_templates: Dict[str, str] = {}
for yaml_file in TEMPLATES_DIR.glob("*.yml"):
    with yaml_file.open("r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh)  # type: ignore
        if isinstance(data, dict):
            _templates.update(data)

# Built-in templates (IDs should be snake_case)
_templates.setdefault(
    "claude_requirement_gathering",
    (
        "You are Claude, an AI design partner.\n"
        "Context: Building \"{project_name}\".\n"
        "Task: Gather requirements for UI/UX spec.\n"
        "Deliverables: bullet list of features, constraints, personas.\n"
    ),
)

_templates.setdefault(
    "openai_detailed_spec",
    (
        "System: You are a technical specification writer.\n"
        "User: Produce a Markdown document defining:\n"
        "1. UI components (cards, buttons, inputs)\n"
        "2. Tailwind CSS classes\n"
        "3. Example React JSX snippets\n"
        "Include ARIA roles for accessibility.\n"
    ),
)


def get_template(name: str) -> str:
    """Return template by name."""
    if name not in _templates:
        raise KeyError(f"Template '{name}' not found.")
    return _templates[name]


__all__ = ["get_template"]