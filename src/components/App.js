import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'


// ???
axios.defaults.headers.common['Content-Type'] = 'application/json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.searchContent = this.searchContent.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(datas=>{

        this.setState({
          posts: datas.data
        });

      })
      .catch(e=>{
        console.log(e);
      })
  }

  updatePost(id, text) {

    console.log(id, text)

    axios.put(`http://localhost:9090/posts/${id}`, {text})
      .then(response =>{
        // this.setState({ post: Object.assign({},responce.data)});        
        const updatedPost = response.data;

        console.log("updated post" + updatedPost)

        const updatedPosts = this.state.posts.map(post => {
          if (post.id === updatedPost.id) {
            return { post, ...updatedPost };
          } else {
            return post;
          }
        });
  
        this.setState({ posts: updatedPosts });
      }).catch(e=>alert(e));

      console.log(this.state);

  }

  deletePost(id) {
    axios.delete(`http://localhost:9090/posts/${id}`).then(response =>{
      this.setState({
        posts: this.state.posts.filter(post => post.id !== id)
      });
    }).catch(e=>{
      alert(e);
    })
  } 

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
      .then(results=>{

        console.log(results.data);

        this.setState({posts: results.data})
      }).catch(e=>alert(e))
  }

  searchContent(text){

    let texts = text.target.value;
    let res = [];

    axios.get(`https://practiceapi.devmountain.com/api/posts/?q=${texts}`)
      .then(datas=>{

        datas.data.map(data=>{
          if(data.text.includes(`${texts}`))
              return res.push(data)
        })

        this.setState({
          posts: res
        });

      })
      .catch(e=>{
        console.log(e);
      })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchContent={this.searchContent}/>

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
        {

          posts.map(post=>{
            return <Post key={post.id}
              id={post.id}
             text={post.text} 
             date={post.date}
             updatePostfn={this.updatePost}
             deletePostfn={this.deletePost}/>
          })
        }
        </section>
      </div>
    );
  }
}

export default App;
