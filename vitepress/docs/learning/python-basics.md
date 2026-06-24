---
title: Python 基础
order: 5
---

# Python 基础

语法速记与常用标准库。

## 列表推导

```python
squares = [x * x for x in range(10) if x % 2 == 0]
```

## 文件读写

```python
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()
```

## 虚拟环境

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 类型提示

```python
def greet(name: str) -> str:
    return f'Hello, {name}'
```
