import styles from './App.module.css';
import './global.css';

import { Post, PostType } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/ligiapretel.png',
      name: 'Ligia Pretel Eimantas',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala pessoal, blz?'},
      { type: 'paragraph', content: 'Bora codar mais um pouquinho hoje? É dia de aprender mais sobre React.'},
      { type: 'link', content: 'react/projetotop'},
      { type: 'tag', content: [
          '#reactjs',
          '#boracodar',
        ]
      },
    ],
    publishedAt: new Date('2023-05-13 10:15:21'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator Rocketseat',
    },
    content: [
      { type: 'paragraph', content: 'Alou, alou!'},
      { type: 'paragraph', content: 'Se liguem nessa novidade da Rockeseat: Atualização do curso de React!'},
      { type: 'link', content: 'react/news'},
      { type: 'tag', content: [
          '#reactjs',
          '#news',
          '#estudos',
        ]
      },
    ],
    publishedAt: new Date('2023-05-20 11:21:10'),
  },
]

export function App() {
  
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id} 
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}