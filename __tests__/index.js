"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prettier_1 = require("prettier");
var fs_1 = require("fs");
test('Try to pretty-print a file', function () {
    return expect(prettier_1.format(fs_1.readFileSync('./__tests__/example.1.in.rules').toString(), {
        plugins: ['./lib'],
        parser: 'firebase-database'
    })).toBe(fs_1.readFileSync('./__tests__/example.out.rules').toString());
});
test('Try to pretty-print a minified file', function () {
    return expect(prettier_1.format(fs_1.readFileSync('./__tests__/example.2.in.rules').toString(), {
        plugins: ['./lib'],
        parser: 'firebase-database'
    })).toBe(fs_1.readFileSync('./__tests__/example.out.rules').toString());
});
