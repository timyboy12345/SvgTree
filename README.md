# SvgTree
This repository has the ability to create SVG tree maps with Javascript, without any frameworks!

## Example
```javascript
tree(element, [
    {"key": "test1", "text": "test 1", targets: ["test3", "test5"]},
    {"key": "test2", "text": "test 2", targets: ["test3"]},
    {"key": "test3", "text": "test 3"},
    {"key": "test4", "text": "test 4"},
    {"key": "test5", "text": "test 5"}
], {});
```
