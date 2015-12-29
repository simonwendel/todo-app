import 'JamieMason/Jasmine-Matchers';
import { Color } from 'js/types';
import { Todo } from 'js/types';

describe('Class: Todo (types.js)', () => {

    describe('Constructor', () => {

        it('should set default prop values if empty data object.', () => {

            let todo = new Todo({});

            expect(todo.id).toBe(null);
            expect(todo.title).toBe(null);
            expect(todo.description).toBe(null);
            expect(todo.color).toBe(null);

            expect(todo.created).toBeDate();
            expect(todo.nextOccurrance).toBe(todo.created);
            expect(todo.recurring).toBe(0);

        });

        it('should set default prop values if undefined data object.', () => {

            let todo = new Todo({});

            expect(todo.id).toBe(null);
            expect(todo.title).toBe(null);
            expect(todo.description).toBe(null);
            expect(todo.color).toBe(null);

            expect(todo.created).toBeDate();
            expect(todo.nextOccurrance).toBe(todo.created);
            expect(todo.recurring).toBe(0);

        });

        it('should set prop values from passed in data object.', () => {

            let data = {
                id: 13,
                title: 'Title',
                description: 'Description goes here',
                color: new Color('p!nk', 'p!nk'),
                created: new Date('June 23, 1912'),
                nextOccurrance: new Date('June 7, 1954'),
                recurring: 210
            };

            let todo = new Todo(data);

            expect(todo.id).toBe(data.id);
            expect(todo.title).toBe(data.title);
            expect(todo.description).toBe(data.description);
            expect(todo.color).toBe(data.color);

            expect(todo.created).toBe(data.created);
            expect(todo.nextOccurrance).toBe(data.nextOccurrance);
            expect(todo.recurring).toBe(data.recurring);

        });

        it('should enforce argument types.', () => {

            let data = {
                id: '13',
                title: true,
                description: 1,
                color: {},
                created: false,
                nextOccurrance: 'June 7, 1954',
                recurring: '210'
            };

            expect(() => new Todo(data)).toThrow();

        });

    });

});
