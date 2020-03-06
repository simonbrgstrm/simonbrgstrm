+++
title = "Markdown Cheatsheet"
description = ""
type = ["posts","post"]
tags = [
    "Markdown",
    "cheatsheet",
]
date = "2020-03-01"
categories = [
    "Development",
    "text",
]
series = [""]
[ author ]
  name = "Simon Bergstrom"
+++
---
## Headers
```
# H1
## H2
### H3
#### H4
##### H5
###### H6

```
# H1
## H2
### H3
#### H4
##### H5
###### H6

---

## Emphasis

```
italics, *asterisks* or _underscores_.

Bold, **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough, ~~Scratch this.~~
```
italics, *asterisks* or _underscores_.

Bold, **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough, ~~Scratch this.~~

---

## List
```
1. First ordered list item
2. Another item
4. And another item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```
1. First ordered list item
2. Another item
4. And another item.


* Unordered list can use asterisks
- Or minuses
+ Or pluses

---

## Links

```
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a relative reference to a repository file](../blob/master/LICENSE)

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com
```
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a relative reference to a repository file](../blob/master/LICENSE)

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

---

## Code and Syntax Highlighting

```
Inline `code` has `back-ticks around` it.
```
Inline `code` has `back-ticks around` it.

```
```javascript
var s = "JavaScript syntax highlighting";
alert(s); ```

```python
s = "Python syntax highlighting"
print s ```

``` No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>. ```
```

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
 
```python
s = "Python syntax highlighting"
print s
```
 
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```
---

## Tables

```
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

---

## Blockquotes

```
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> Cont... 
```
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> Continue..

---

## 


