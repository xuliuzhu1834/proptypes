/* eslint-disable */
/**
 * 将react中的 PropTypes 抽离，用prop-types包单独调用
 */

const babel = require('babel-core');
const parserReactJsx = require('babel-plugin-syntax-jsx');
const parserBabelEslint = require('babel-eslint');
const fs = require('fs');
const glob = require('glob');

function trans (babel) {
  const { types: t } = babel;
  return {
    visitor: {
      ImportDeclaration(path) {
        if (!path.get('specifiers').length) return;
        path.get('specifiers').map((v) => {
          if (v.isImportSpecifier()) {
          const imported = v.get('imported');
          if (!imported.isIdentifier()) return v;
          if (imported.get('name').node === 'PropTypes') {
            path.insertAfter(t.importDeclaration([t.importDefaultSpecifier(t.identifier('PropTypes'))], t.stringLiteral('prop-types')));
            v.remove();
          }
        }
      });
      },
    }
  };
}

const reWrite = (file) => {
  fs.readFile(file, (e, data) => {
    const {code} = babel.transform(
      data,
      {plugins: [parserReactJsx, trans]},
      (err, result) => {
      if(err) throwError(err);
});
  fs.writeFile(file, code, (e) => {
    if(e) { throw e}
  });
});
};


glob("**/*.jsx", function (er, files) {
  if (er) {
    throw er;
  }
  files.filter(v => v.indexOf('node_modules') < 0).forEach(v => reWrite(v));
});


