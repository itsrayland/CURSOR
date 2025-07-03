"""Model wrapper abstractions used by the workstation.

Each wrapper exposes a single `generate` coroutine method that accepts:
    - prompt: str | list[dict] (OpenAI chat format)
    - **kwargs: model-specific overrides
and returns the generated content as str.

Real API calls are performed only if API keys are supplied; otherwise a stub response is returned
so developers can test flows without credentials.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List, Optional, Union, overload

from .config import settings

logger = logging.getLogger(__name__)

try:
    import openai  # type: ignore
except ImportError:  # pragma: no cover
    openai = None  # type: ignore

try:
    import anthropic  # type: ignore
except ImportError:  # pragma: no cover
    anthropic = None  # type: ignore


class BaseModelWrapper:  # pylint: disable=too-few-public-methods
    """Base class for model wrappers."""

    def __init__(self, model: str, api_key: str | None):
        self.model = model
        self.api_key = api_key or ""

    def _stub(self, prompt: Any, **kwargs: Any) -> str:  # noqa: D401
        """Return a stub response when no API key is available."""
        logger.warning("No API key provided for %s; returning stub response.", self.__class__.__name__)
        return f"[STUB] Model: {self.model}\nPrompt (truncated): {str(prompt)[:100]}"

    async def generate(self, prompt: Any, **kwargs: Any) -> str:  # noqa: D401
        """Generate text from the model (to be implemented by subclasses)."""
        raise NotImplementedError


class OpenAIWrapper(BaseModelWrapper):
    """Wrapper for OpenAI GPT models."""

    async def generate(self, prompt: Union[str, List[Dict[str, str]]], **kwargs: Any) -> str:  # type: ignore
        if not settings.OPENAI_API_KEY or openai is None:
            return self._stub(prompt, **kwargs)

        openai.api_key = settings.OPENAI_API_KEY
        if isinstance(prompt, str):
            messages = [
                {"role": "user", "content": prompt},
            ]
        else:
            messages = prompt
        response = await openai.ChatCompletion.acreate(  # type: ignore
            model=self.model,
            messages=messages,
            temperature=kwargs.get("temperature", 0.7),
            max_tokens=kwargs.get("max_tokens", 2048),
        )
        return response.choices[0].message.content  # type: ignore


class ClaudeWrapper(BaseModelWrapper):
    """Wrapper for Anthropic Claude models."""

    async def generate(self, prompt: str, **kwargs: Any) -> str:  # type: ignore
        if not settings.CLAUDE_API_KEY or anthropic is None:
            return self._stub(prompt, **kwargs)

        client = anthropic.AsyncAnthropic(api_key=settings.CLAUDE_API_KEY)  # type: ignore
        response = await client.messages.create(
            model=self.model,
            max_tokens=kwargs.get("max_tokens", 2048),
            temperature=kwargs.get("temperature", 0.7),
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text  # type: ignore


class ULMWrapper(BaseModelWrapper):
    """Placeholder wrapper for Unified Language+Vision model."""

    async def generate(self, prompt: str | Dict[str, Any], **kwargs: Any) -> str:  # type: ignore
        # No SDK available; stub only
        return self._stub(prompt, **kwargs)


# Factory helpers
openai_model = OpenAIWrapper(settings.OPENAI_MODEL, settings.OPENAI_API_KEY)
claude_model = ClaudeWrapper(settings.CLAUDE_MODEL, settings.CLAUDE_API_KEY)
ulm_model = ULMWrapper(settings.ULM_MODEL, settings.ULM_API_KEY)

__all__ = [
    "openai_model",
    "claude_model",
    "ulm_model",
]