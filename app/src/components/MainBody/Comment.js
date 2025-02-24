import React from 'react';
import { useSelector } from 'react-redux'
import '../../styles/Comment.css';


function Comment(props){
    let { text, author } = props.comment;

    const { users } = useSelector(
        (state) => state.comment
    )

    return (
        <div className='comments_info'>
            <div className='comments'>
                <p className='author'>{users[author].first_name} {users[author].last_name}</p>
                <p className='comment_text'>{text}</p>
            </div>
        </div>
    )
}

export function GetComments(props){
    let book_id = props.book_id

    const { comments, commentsList, users, books } = useSelector(
        (state) => state.comment
    )

    const filtered_comments = commentsList.filter(
        (commentId) => comments[commentId].book == book_id
    );

    const top_comments = filtered_comments.slice(-2)

    return (
        top_comments.map(
            (commentId) => <Comment key={commentId} comment={comments[commentId]}></Comment>
        )
    )
}

export function GetAllBookComments(props){
    let book_id = props.book_id

    const { comments, commentsList, users, books } = useSelector(
        (state) => state.comment
    )

    const filtered_comments = commentsList.filter(
        (commentId) => comments[commentId].book == book_id
    );

    return (
        filtered_comments.map(
            (commentId) => <Comment key={commentId} comment={comments[commentId]}></Comment>
        )
    )
}

export default Comment;