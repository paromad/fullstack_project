import { normalize, schema } from 'normalizr'


export function normalizeBook(book) {
  const bookSchema = new schema.Entity('books')

  return normalize(book, bookSchema)
}


export function normalizeBooks(booksList) {
    const bookSchema = new schema.Entity('books')
  
    return normalize(booksList, [bookSchema])
}
