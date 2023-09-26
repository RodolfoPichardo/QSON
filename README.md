![Node.js CI](https://github.com/RodolfoPichardo/QSON/actions/workflows/node.js.yml/badge.svg)

# Why QSON
JSON is incredible, it is the most popular data exchange notation for a reason, it is simple, elegant, and lightweight; however, on large and complex datasets, it is a hassle to browse through it.

Heavily inspired by JQ and Zed, QSON is a notation built to look through JSON, it works by declaring the properties one is interested in seeing, and QSON would return a result in the form of JSON.

# Examples
JSON input
```json
[
  {
    "name": "Alice Montgomery",
    "age": 25,
    "id": 2421041,
    "hobbies": [
      "Hiking",
      "Baking",
      "Horse-back riding"
    ]
  },
  {
    "name": "Bob Jonhson",
    "age": 24,
    "id": 2439002,
    "hobbies": [
      "Reading",
      "Bird watching",
      "Photography"
    ]
  }
]
```

There are only two entries on that object, but it would be easy to imagine having a 100 records or more, and it is increasingly difficult to comb through that information.

Enter QSON:
```
[[].name]
```

Result:
```json
[
  "Alice Montgomery",
  "Bob Johnson"
]
```

Pretty neat, but let's step it up a notch:
```
{
  [].id: {
    "name": [].name,
    "age": [].age
  }
}
```

Result:
```json
{
  "2421041": {
    "name": "Alice Montgomery",
    "age": 25
  },
  "2439002": {
    "name": "Bob Johnson",
    "age": 24
  }
}
```

# Usage
On JavaScript, the usage is as follows:
```javascript
const qson = new QSON(query);
console.log(
  qson.filter(jsonObj)
);
```

The result will be in the form of a JavaScript object or array
