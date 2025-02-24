import { normalize, schema } from 'normalizr'


export function normalizeBookLists(bookListsList) {
    const userSchema = new schema.Entity('users')
    const bookSchema = new schema.Entity('books')
    const bookListSchema = new schema.Entity('book_list', { author: userSchema, books: [bookSchema] })

    return normalize(bookListsList, [bookListSchema])
}
