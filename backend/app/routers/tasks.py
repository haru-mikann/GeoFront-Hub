import os
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

TODO_MD_PATH = os.getenv("TODO_MD_PATH", "todo.md")
TASK_PATTERN = re.compile(r"^- \[([ x])\] (.+)$")


class TaskCreate(BaseModel):
    title: str

    @field_validator("title")
    @classmethod
    def no_newline(cls, v: str) -> str:
        if "\n" in v or "\r" in v:
            raise ValueError("title must not contain newlines")
        return v.strip()


class TaskUpdate(BaseModel):
    title: str | None = None
    done: bool | None = None

    @field_validator("title")
    @classmethod
    def no_newline(cls, v: str | None) -> str | None:
        if v is not None and ("\n" in v or "\r" in v):
            raise ValueError("title must not contain newlines")
        return v.strip() if v is not None else v


def _read_lines() -> list[str]:
    if not os.path.exists(TODO_MD_PATH):
        return []
    with open(TODO_MD_PATH, "r", encoding="utf-8") as f:
        return f.readlines()


def _write_lines(lines: list[str]) -> None:
    with open(TODO_MD_PATH, "w", encoding="utf-8") as f:
        f.writelines(lines)


def _parse_tasks(lines: list[str]) -> list[dict]:
    tasks = []
    for i, line in enumerate(lines):
        m = TASK_PATTERN.match(line.rstrip())
        if m:
            tasks.append({"id": i, "title": m.group(2), "done": m.group(1) == "x"})
    return tasks


@router.get("")
async def get_tasks():
    return _parse_tasks(_read_lines())


@router.post("", status_code=201)
async def create_task(body: TaskCreate):
    lines = _read_lines()
    lines.append(f"- [ ] {body.title}\n")
    _write_lines(lines)
    return {"id": len(lines) - 1, "title": body.title, "done": False}


@router.put("/{task_id}")
async def update_task(task_id: int, body: TaskUpdate):
    lines = _read_lines()
    if task_id < 0 or task_id >= len(lines):
        raise HTTPException(status_code=404, detail="Task not found")
    m = TASK_PATTERN.match(lines[task_id].rstrip())
    if not m:
        raise HTTPException(status_code=404, detail="Task not found")
    new_done = body.done if body.done is not None else (m.group(1) == "x")
    new_title = body.title if body.title is not None else m.group(2)
    mark = "x" if new_done else " "
    lines[task_id] = f"- [{mark}] {new_title}\n"
    _write_lines(lines)
    return {"id": task_id, "title": new_title, "done": new_done}


@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: int):
    lines = _read_lines()
    if task_id < 0 or task_id >= len(lines):
        raise HTTPException(status_code=404, detail="Task not found")
    if not TASK_PATTERN.match(lines[task_id].rstrip()):
        raise HTTPException(status_code=404, detail="Task not found")
    del lines[task_id]
    _write_lines(lines)
