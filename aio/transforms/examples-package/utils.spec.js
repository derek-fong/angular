const { mapObject, parseAttributes } = require('./utils');

fdescribe('utils', () => {
  describe('mapObject', () => {
    it('creates a new object', () => {
      const testObj = { a: 1 };
      const mappedObj = mapObject(testObj, (key, value) => value);
      expect(mappedObj).toEqual(testObj);
      expect(mappedObj).not.toBe(testObj);
    });

    it('maps the values via the mapper function', () => {
      const testObj = { a: 1, b: 2 };
      const mappedObj = mapObject(testObj, (key, value) => value * 2);
      expect(mappedObj).toEqual({ a: 2, b: 4 });
    });
  });

  describe('parseAttributes', () => {
    it('should parse empty string', () => {
      const attrs = parseAttributes('');
      expect(attrs).toEqual({ });
    });

    it('should parse blank string', () => {
      const attrs = parseAttributes('  ');
      expect(attrs).toEqual({ });
    });

    it('should parse double quoted attributes', () => {
      const attrs = parseAttributes('a="one" b="two"');
      expect(attrs).toEqual({ a: 'one', b: 'two' });
    });

    it('should parse empty quoted attributes', () => {
      const attrs = parseAttributes('a="" b="two"');
      expect(attrs).toEqual({ a: '', b: 'two' });
    });

    it('should parse single quoted attributes', () => {
      const attrs = parseAttributes('a=\'one\' b=\'two\'');
      expect(attrs).toEqual({ a: 'one', b: 'two' });
    });

    it('should ignore whitespace', () => {
      const attrs = parseAttributes('   a = "one"   b  =  "two"   ');
      expect(attrs).toEqual({ a: 'one', b: 'two' });
    });

    it('should parse attributes with quotes within quotes', () => {
      const attrs = parseAttributes('a=\'o"n"e\' b="t\'w\'o"');
      expect(attrs).toEqual({ a: 'o"n"e', b: 't\'w\'o' });
    });

    it('should parse attributes with spaces in their values', () => {
      const attrs = parseAttributes('a="one and two" b="three and four"');
      expect(attrs).toEqual({ a: 'one and two', b: 'three and four' });
    });

    it('should parse empty attributes', () => {
      const attrs = parseAttributes('a b="two"');
      expect(attrs).toEqual({ a: true, b: 'two' });
    });

    it('should parse unquoted attributes', () => {
      const attrs = parseAttributes('a=one b=two');
      expect(attrs).toEqual({ a: 'one', b: 'two' });
    });

    it('should complain if a quoted attribute is not closed', () => {
      expect(() => parseAttributes('a="" b="two')).toThrowError(
        'Unterminated quoted attribute value in `a="" b="two`. Starting at 8. Expected a " but got "end of string".'
      );
    })
  });
});