const {matchTextTest} = require('../../front-end/content')

// list is our keywords_regex that we use for matching
test('Obvious GoT relation should matchTextTest', () => {
	expect(matchTextTest('Ned Stark\'s head is chopped off')).not.toBeNull();
});

test('Punctuation shouldn\'t matter', () => {
	expect(matchTextTest('Ned Stark\'s ').not.toBeNull());
});

test('Capitals shouldn\'t matter)', () => {
	expect(matchTextTest('JORAH IS CURED OF GREYSCALE')).not.toBeNull();
});

test('No relevant text should\'t pass', () => {
	expect(matchTextTest('Doing my tests')).toBeNull();
});

test('Empty strings shouldn\'t pass', () => {
	expect(matchTextTest('')).toBeNull();
});

test('Numbers can pass depending on context', () => {
	expect(matchTextTest('daenerys\' 2000 unsullied shouldn\'t be messed with')).not.toBeNull();
});

test('Numbers sometimes should not pass too', () => {
	expect(matchTextTest('Burnie vs Trump 2020')).toBeNull();
});

test('Subwords should not pass', () => {
	expect(matchTextTest('The shop was robbed')).toBeNull();	// contains "robb"
});

test('Rearranged words should not pass', () => {
	expect(matchTextTest('Thrones is a Game of up to four players')).toBeNull();
});