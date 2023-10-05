const JSONParser = require('./parser');

test('Test Empty Object', () => {
	let output = new MockOutput();
	let jsonObj = {};
	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([ { type: 'beginObject' }, { type: 'endObject' } ]);
});


test('Test Empty Array', () => {
	let output = new MockOutput();
	let jsonObj = [];
	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([ { type: 'beginArray' }, { type: 'endArray' } ]);
});

test('Test Object with string', () => {
	let output = new MockOutput();
	let jsonObj = {
		"abc":"def"
	};
	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([
		{ type: 'beginObject' },
		{ type: 'attr', value: '"abc"'},
		{ type: 'nameSeparator'},
		{ type: 'string', value: '"def"'},
		{ type: 'endObject' } ]);
});

test('Test empty strings', () => {
	let output = new MockOutput();
	let jsonObj = {
		"": ""
	}
	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([
		{ type: 'beginObject' },
		{ type: 'attr', value: '""'},
		{ type: 'nameSeparator'},
		{ type: 'string', value: '""'},
		{ type: 'endObject' } ]);
});

test('Test strings with space characters', () => {
	let output = new MockOutput();
	let jsonObj = {
		" \t\n\r":" \t\n\r"
	};

	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([
		{ type: 'beginObject' },
		{ type: 'attr', value: '" \\t\\n\\r"'},
		{ type: 'nameSeparator'},
		{ type: 'string', value: '" \\t\\n\\r"'},
		{ type: 'endObject' } ]);
});

test('Test strings with double slash', () => {
	let output = new MockOutput();
	let jsonObj = {
		"\\": "\\"
	};

	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([
		{ type: 'beginObject' },
		{ type: 'attr', value: '"\\\\"'},
		{ type: 'nameSeparator'},
		{ type: 'string', value: '"\\\\"'},
		{ type: 'endObject' } ]);
});

test('Test strings with double quotes', () => {
	let output = new MockOutput();
	let jsonObj = {
		"\"":"\""
	};

	let jsonParser = new JSONParser(JSON.stringify(jsonObj), output);
	jsonParser.run();
	expect(output.token).toEqual([
		{ type: 'beginObject' },
		{ type: 'attr', value: '"\\""'},
		{ type: 'nameSeparator'},
		{ type: 'string', value: '"\\""'},
		{ type: 'endObject' } ]);
});




class MockOutput {
	constructor() {
		this.token = [];
	}

	beginObject() {
		this.token.push({
			'type': 'beginObject'
		});
	}

	endObject() {
		this.token.push({
			'type': 'endObject'
		});
	}

	beginArray() {
		this.token.push({
			'type': 'beginArray'
		});
	}
	
	endArray() {
		this.token.push({
			'type': 'endArray'
		});

	}
	
	valueSeparator() {
		this.token.push({
			'type': 'valueSeparator'
		});
	}

	nameSeparator() {
		this.token.push({
			'type': 'nameSeparator'
		});
	}

	string(str) {
		this.token.push({
			'type': 'string',
			'value': str
		});

	}
	
	literal(str) {
		this.token.push({
			'type': 'literal',
			'value': str
		});

	}
	
	number(str) {
		this.token.push({
			'type': 'number',
			'value': str
		});

	}

	attr(str) {
		console.log(this);
		this.token.push({
			'type': 'attr',
			'value': str
		});
	}

	addError(str) {
		this.token.push({
			'type': 'error',
			'value': str
		});
	}
}
