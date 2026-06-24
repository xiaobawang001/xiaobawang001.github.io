---
title: React 学习笔记
order: 4
---

# React 学习笔记

函数组件与 Hooks 要点整理。

## useState

```tsx
const [count, setCount] = useState(0)
```

## useEffect

```tsx
useEffect(() => {
  document.title = `点击 ${count} 次`
}, [count])
```

## 组件通信

- 父 → 子：props
- 子 → 父：回调函数
- 跨层：Context 或状态管理库

## 性能

`useMemo`、`useCallback` 避免不必要的重渲染，但不要过早优化。
