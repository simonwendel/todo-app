const eslintRc = {
    'extends': 'eslint',
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'jasmine': true,
        'es6': true
    },
    'rules': {
        'strict': [2, 'never'],
        'no-use-before-define': [2, 'nofunc'],
        'quotes': [2, 'single', 'avoid-escape'],
        'require-jsdoc': [2, {
            'require': {
                'FunctionDeclaration': false,
                'MethodDefinition': false,
                'ClassDeclaration': false
            }
        }]
    }
};

export default eslintRc;
