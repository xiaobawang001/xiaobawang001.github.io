---
title: CSS 布局笔记
order: 6
---

# CSS 布局笔记

Flex 与 Grid 的使用场景对比。

## Flexbox

适合一维排列：导航栏、工具栏、居中。

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Grid

适合二维布局：卡片墙、整页分区。

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

## 居中技巧

- 单行文本：`text-align: center`
- 块级未知尺寸：`margin: auto` + 定宽
- 任意元素：`flex` 或 `grid` 的 `place-items: center`
