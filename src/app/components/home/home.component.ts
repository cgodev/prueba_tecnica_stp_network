import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit,OnDestroy {

  heroes = [{
    team: "Marvel",
    name: "Ironman",
    likes: 50,
    dislikes: 100,
    background: "ironman.jpg",
    info: 'https://en.wikipedia.org/wiki/Iron_Man'
  },
  {
    team :"DC",
    name: "Batman",
    likes: 20,
    dislikes: 15,
    background: "batman.jpg",
    info:'https://en.wikipedia.org/wiki/Batman'
  },
  {
    team :"Marvel",
    name: "Hulk",
    likes: 80,
    dislikes: 45,
    background: "hulk.jpg",
    info:'https://en.wikipedia.org/wiki/Hulk'
  },
  {
    team :"Marvel",
    name: "Spiderman",
    likes: 80,
    dislikes: 45,
    background: "spiderman.jpg",
    info:'https://en.wikipedia.org/wiki/Spiderman'
  },
  {
    team :"DC",
    name: "Aquaman",
    likes: 80,
    dislikes: 45,
    background: "aquaman.jpg",
    info:'https://en.wikipedia.org/wiki/Aquaman'
  }]

  selectedHero =  {
    team :"",
    name: "",
    likes: 0,
    dislikes: 0,
    background: "",
    info : ""
  }

  background = ''
  dislike = false;
  like = false;
  unVoted = true;
  
  //voteVariables
  upVote: number = 50 
  downVote : number = 50 
  totalVote : number = 0
  upPerc : number = 0
  downPerc : number  = 0
  hidde: boolean = false;
  
  index = 0;

  constructor() {
    
  }

  ngOnInit(): void {
    if(localStorage.getItem("heroes") === null){
      this.saveHeroes();
    }
    this.loadHeroes();
    this.selectedHero = this.heroes[this.index];
    this.heroes = this.heroes.filter(x => x.name !== this.selectedHero.name);
    this.assingValues();
    this.calculateData();
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.heroes.unshift(this.selectedHero);
    this.saveHeroes();
  }

  ngOnDestroy(): void {
    
  }

  saveHeroes(){
    localStorage.setItem("heroes",JSON.stringify(this.heroes));
  }

  loadHeroes(){
    this.heroes = JSON.parse(localStorage.getItem("heroes"));
    console.log(this.heroes)
  }

  calculateData(){
    this.selectedHero.likes = this.upVote;
    this.selectedHero.dislikes = this.downVote;
    this.totalVote = this.upVote + this.downVote
    this.upPerc = Math.ceil(100* (this.upVote/this.totalVote));
    this.downPerc = Math.floor(100* (this.downVote/this.totalVote));
    this.upPerc = parseInt(this.upPerc.toFixed(0));
    this.downPerc = parseInt(this.downPerc.toFixed(0));
  }

  assingValues() {
    this.upVote = this.selectedHero.likes
    this.downVote = this.selectedHero.dislikes
    this.background = '../assets/images/'+this.selectedHero.background
  }

  restart(){
    this.unVoted = true;
    this.like = false;
    this.dislike = false;
  }

  vote(vote: boolean){
    if(vote){
      this.like = true;
      this.dislike = false;
      this.unVoted = false;
      this.upVote += 1;
      this.calculateData();
    }else{
      this.dislike = true;
      this.like = false;
      this.unVoted = false;
      this.downVote += 1;
      this.calculateData();
    }
  }

  saveHero(){
    this.selectedHero.likes = this.upVote;
    this.selectedHero.dislikes = this.downVote;
  }
  selectHero(index){
    this.saveHero();
    //asigno el heroe
    this.heroes.push(this.selectedHero);
    this.selectedHero = this.heroes[index];
    this.heroes = this.heroes.filter(x => x.name !== this.selectedHero.name);
    this.assingValues();
    //envio la data
    this.upVote = this.selectedHero.likes;
    this.downVote = this.selectedHero.dislikes;
    this.calculateData();
    this.restart();
  }

  closeInfo(){
    this.hidde = true;
  }

  getHero(index){
    this.index = index;
    this.selectHero(this.index);
  }
}
