import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

// interface Content {
//     type: 'paragraph' | 'link' | 'tag';
//     content: string;
// }

interface ParagraphContent {
        type: 'paragraph';
    content: string;
}

interface LinkContent {
    type: 'link';
    content: string;
}

interface TagContent {
    type: 'tag';
    content: string[];
}
  
type Content = ParagraphContent | LinkContent | TagContent;

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    post: PostType
}

export function Post({post}: PostProps){
    const [comments, setComments] = useState([
        'Top demais!'
    ]);

    const [newComment, setNewComment] = useState('');

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH'h'mm", {
        locale: ptBR,
    })

    const publishedRelativeDate = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();

        setComments([...comments, newComment]);
        setNewComment('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');

        setNewComment(event.target.value);
    }

    function handleSetInvalidMessage(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Campo obrigatório');
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment=>{
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newComment.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar 
                        src={post.author.avatarUrl}
                        alt="Imagem de perfil do autor da publicação"
                    />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedRelativeDate}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(item=>{
                    if(item.type === 'paragraph'){
                        return <p key={item.content}>{item.content}</p>
                    }else if(item.type === 'link'){
                        return <p key={item.content}><a href="">{item.content}</a></p>
                    }else if(item.type === 'tag'){
                        return (
                            <p key={item.type}>
                                {item.content.map(tag=>{
                                    return <a key={tag} href="" className={styles.tag}>{tag}</a>
                                })}
                            </p>
                        )
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='comment'
                    value={newComment}
                    placeholder='Escreva seu comentário'
                    onChange={handleNewCommentChange}
                    onInvalid={handleSetInvalidMessage}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(item=>{
                    return (
                        <Comment 
                            key={item}
                            content={item}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>
    )
}