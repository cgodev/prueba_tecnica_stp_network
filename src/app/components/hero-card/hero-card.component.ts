import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.sass']
})
export class HeroCardComponent implements OnInit {
  @Input() actualHero = {
    team :"",
    name: "",
    likes: 0,
    dislikes: 0,
    background: "",
    info: ""
  }

  @Output() currentCaller = new EventEmitter<any>();
  @Input() current;

  background = ''
  dislike = false;
  like = false;
  unVoted = true;

  upVote: number = 50 
  downVote : number = 50 
  totalVote : number = 0
  upPerc : number = 0
  downPerc : number  = 0
  hidde: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.assingValues();
    this.calculateData();
  }


  calculateData(){
    this.totalVote = this.upVote + this.downVote
    this.upPerc = Math.ceil(100* (this.upVote/this.totalVote));
    this.downPerc = Math.floor(100* (this.downVote/this.totalVote));
    this.upPerc = parseInt(this.upPerc.toFixed(0));
    this.downPerc = parseInt(this.downPerc.toFixed(0));
  }

  assingValues() {    
    this.upVote = this.actualHero.likes
    this.downVote = this.actualHero.dislikes
    this.background = '../assets/images/'+this.actualHero.background
    if(this.actualHero.likes>= this.actualHero.dislikes){
      this.like = true;
      this.dislike = false;
    }else{
      this.dislike = true
      this.like = false
    }
  }

  callHero(){
    this.currentCaller.emit(this.current);
  }
}
