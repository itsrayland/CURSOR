"""Workflow orchestrations for the Prompt-Engineering Workstation."""
from __future__ import annotations

import asyncio
import json
from pathlib import Path
from typing import Dict, List

from .config import settings
from .models import claude_model, openai_model, ulm_model
from .templates import get_template


async def kickoff(project_name: str) -> str:
    """Step 1: requirement gathering via Claude."""
    prompt = get_template("claude_requirement_gathering").format(project_name=project_name)
    response = await claude_model.generate(prompt)

    _save_artifact(f"{project_name}_requirements.md", response)
    return response


async def generate_spec(project_name: str, requirements_md: str) -> str:
    """Step 2: convert requirements into detailed spec via OpenAI."""
    system_prompt = get_template("openai_detailed_spec")
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": requirements_md},
    ]
    response = await openai_model.generate(messages)

    _save_artifact(f"{project_name}_spec.md", response)
    return response


async def media_generation(project_name: str, prompt: str) -> str:
    """Step 3: media generation via ULM (placeholder)."""
    response = await ulm_model.generate(prompt)

    _save_artifact(f"{project_name}_media.txt", response)
    return response


async def full_workflow(project_name: str) -> Dict[str, str]:
    """Execute kickoff → spec → media chain."""
    requirements = await kickoff(project_name)
    spec = await generate_spec(project_name, requirements)
    media_resp = await media_generation(project_name, f"Generate assets for {project_name}")

    return {
        "requirements": requirements,
        "spec": spec,
        "media_stub": media_resp,
    }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _save_artifact(filename: str, content: str) -> None:
    """Save content to artifact folder."""
    path = settings.OUTPUT_DIR / filename
    path.write_text(content, encoding="utf-8")

    if settings.ENABLE_GIT_COMMIT:
        import subprocess  # noqa: WPS433

        subprocess.run(["git", "add", str(path)], check=False)
        subprocess.run(["git", "commit", "-m", f"workstation: add {filename}"], check=False)


__all__ = [
    "kickoff",
    "generate_spec",
    "media_generation",
    "full_workflow",
]