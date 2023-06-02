import { useState } from 'react';
import { Avatar } from './Avatar';
import { Trash, HandsClapping } from '@phosphor-icons/react';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps){

    const [likeCounter, setLikeCounter] = useState(0);

    function handleDeleteComment(){
        onDeleteComment(content);    
    }

    function handleLikeComment(){
        // Quando o valor da atualização do estado depende dele mesmo, recomenda-se fazer uma atualização funcional
        setLikeCounter((state)=>{
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src="https://github.com/diego3g.png" 
                alt="Imagem de perfil do usuário"
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego Fernandes</strong>
                            <time title='29 de Maio às 10h33' dateTime='2023-05-29 10:33:22'>Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <HandsClapping />
                        Aplaudir <span>{likeCounter}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}