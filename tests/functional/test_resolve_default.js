import { expect } from 'chai';
import * as babel from 'babel-core';
import fs from 'fs';
import c3poPlugin from 'src/plugin';
import { rmDirSync } from 'src/utils';

const translations = 'tests/fixtures/resolve_simple_gettext.po';

const options = {
    presets: ['es2015'],
    plugins: [[c3poPlugin, { resolve: { translations } }]],
};

describe('Resolve default', () => {
    before(() => {
        rmDirSync('debug');
    });
    it('should not resolve if no extractors match', () => {
        const expectedPath = 'tests/fixtures/expected_resolve_if_no_extractor_match.js.src';
        const input = 'console.log(gtt`simple string literal ${a}`);';
        const result = babel.transform(input, options).code;
        const expected = fs.readFileSync(expectedPath).toString();
        expect(result).to.eql(expected);
    });
});
