import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShowPostPage } from '../show-post/show-post';

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {
  posts: any[];
  postsFound: any[];

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.initPostsArray();
  }

  initPostsArray() {
    this.posts = [
      { title: 'Como me aproximar mais de Deus' },
      { title: 'Conheça a ferramenta 3 leis espirituais' },
      { title: 'Como executar desafio do voluntário chave' },
      { title: '5 lições que aprendemos com o apóstolo Paulo' }
    ];

    this.postsFound = this.posts;
  }

  getPosts(event: any) {
    const value = event.target.value;

    const expression = new RegExp(value, 'i');
    this.postsFound = this.posts.filter(item => expression.test(item.title));
  }

  showPost(post: any) {
    this.navCtrl.push(ShowPostPage, { ...post });
  }
}
