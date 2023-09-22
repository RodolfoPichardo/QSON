const JSONParser = require('./parser');

test('Build a parser', () => {
	let output = new MockOutput();
	let jsonParser = new JSONParser(output);
	expect(true).toBe(true);
});

class MockOutput {
	constructor() {
		this.tokens = [];
	}

	beginObject() {
		this.token.push({
			'type': 'beginObject'
		});
	}

	beginArray() {
		this.token.push({
			'type': 'beginArray'
		});
	}

	endObject() {
		this.token.push({
			'type': 'endObject'
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

	endArray() {
		this.token.push({
			'type': 'endArray'
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
