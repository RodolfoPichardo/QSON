const JSONParser = require('./parser');

test('Build a parser', () => {
	let output = new MockOutput();
	let jsonParser = new JSONParser('{}', output);
	jsonParser.run();
	expect(output.token).toEqual([ { type: 'beginObject' }, { type: 'endObject' } ]);
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
