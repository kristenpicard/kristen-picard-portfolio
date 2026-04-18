#!/usr/bin/env python3
"""
Copy an image to src/assets/portrait.png (exact bytes — no edits).

Usage:
  python3 scripts/copy-portrait.py /path/to/your.png
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    out = root / "src" / "assets" / "portrait.png"
    src = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else None
    if src is None or not src.is_file():
        print("Usage: python3 scripts/copy-portrait.py /path/to/your.png", file=sys.stderr)
        sys.exit(1)
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, out)
    print(f"Copied -> {out}")


if __name__ == "__main__":
    main()
