"""Typer-based CLI for the Prompt-Engineering Workstation."""
from __future__ import annotations

import asyncio

import typer
from rich.console import Console
from rich.markdown import Markdown

from .config import settings
from .workflows import full_workflow

app = typer.Typer(add_completion=False, help="Prompt-Engineering Workstation CLI")
console = Console()


@app.command()
def run_project(name: str = typer.Argument(..., help="Project codename, e.g. darzabi")) -> None:
    """Run the full AI-driven workflow for a project."""

    console.rule(f":rocket: Running workflow for [bold]{name}[/bold]")

    results = asyncio.run(full_workflow(name))

    console.rule(":white_check_mark: Workflow complete")

    console.print("[bold]Requirement Draft:[/bold]")
    console.print(Markdown(results["requirements"]))

    console.print("\n[bold]Detailed Spec:[/bold]")
    console.print(Markdown(results["spec"]))

    console.print("\n[bold]Media Generation (stub):[/bold]")
    console.print(results["media_stub"])

    console.print(f"\nArtifacts saved in [cyan]{settings.OUTPUT_DIR}[/cyan]")


if __name__ == "__main__":  # pragma: no cover
    app()