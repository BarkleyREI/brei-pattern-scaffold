---
title: "Supported Markdown"
---

## Headings

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

## Formatting

**bold text**

*italicized text*

```markdown
**bold text**

*italicized text*
```

## Blockquote

> Blockquote

```markdown
> Blockquote
```

## Lists

1. First item
2. Second item
2. Number used doesn't matter
2. It auto increments the number

- Unordered list
- Item
- Item

* You can use dashes
* or asterisks
* for unordered lists

```markdown
1. First item
2. Second item
2. Number used doesn't matter
2. It auto increments the number

- Unordered list
- Item
- Item

* You can use dashes
* or asterisks
* for unordered lists
```

## Code (or unformatted text)

Code in a `Single line` sentence.

```javascript
function test() {
    return 'Fenced code block'
}
```

```markdown
Code in a `Single line` sentence.
```

```markdown
```javascript   [optional highlighting support using highlight.js]
function test() {
    return 'Fenced code block'
}
\```   [without slash]
```
