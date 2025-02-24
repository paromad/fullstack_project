import { normalize, schema } from 'normalizr'


export function normalizeComments(commentsList) {
    const userSchema = new schema.Entity('users')
    const commentSchema = new schema.Entity('comments', { author: userSchema })

    return normalize(commentsList, [commentSchema])
}
