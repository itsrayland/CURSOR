"""Configuration management for the Prompt-Engineering Workstation.

Reads API keys & runtime flags from environment variables (optionally using a .env file).
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv


def _load_dotenv() -> None:
    """Search upward for a .env file and load it if present."""
    env_path = Path.cwd()
    for _ in range(5):
        candidate = env_path / ".env"
        if candidate.exists():
            load_dotenv(candidate)
            break
        if env_path.parent == env_path:
            break
        env_path = env_path.parent


_load_dotenv()


class Settings:  # pylint: disable=too-few-public-methods
    """Simplistic settings container. Feel free to swap for pydantic.BaseSettings later."""

    # API keys (expected to be set in environment or .env)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    CLAUDE_API_KEY: str = os.getenv("CLAUDE_API_KEY", "")
    ULM_API_KEY: str = os.getenv("ULM_API_KEY", "")

    # Model versions
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-preview")
    CLAUDE_MODEL: str = os.getenv("CLAUDE_MODEL", "claude-3-sonnet-20240229")
    ULM_MODEL: str = os.getenv("ULM_MODEL", "ulm-image-beta")

    # Output directory for generated artifacts
    OUTPUT_DIR: Path = Path(os.getenv("WORKSTATION_OUTPUT_DIR", "artifacts"))

    # Git integration
    ENABLE_GIT_COMMIT: bool = os.getenv("WORKSTATION_GIT_COMMIT", "false").lower() in {"1", "true", "yes"}


settings = Settings()

# Ensure output directory exists
settings.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)