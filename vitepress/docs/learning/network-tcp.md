---
title: TCP 协议笔记
order: 7
---

# TCP 协议笔记

三次握手、四次挥手与常见状态。

## 三次握手

1. 客户端 SYN
2. 服务端 SYN + ACK
3. 客户端 ACK

## 四次挥手

主动关闭方先发 FIN，双方各确认一次，确保数据传完。

## 常见状态

| 状态 | 含义 |
|------|------|
| ESTABLISHED | 连接已建立 |
| TIME_WAIT | 主动关闭后等待 |
| CLOSE_WAIT | 对端已关闭，本端未关 |

## 排查

```bash
ss -tn state established
netstat -an | grep 443
```
