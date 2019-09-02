import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from './../services/forum-service.service';
import { ActivatedRoute } from '@angular/router/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  idSala = this.router.snapshot.params["sala-aula"]
  foruns : forum[]
  constructor(private router : ActivatedRoute, private provider : ForumServiceService, private rout : Router) { }

  ngOnInit() {
    this.provider.getAll().subscribe(res => {
      this.foruns = res.filter(x => x.idSala == this.idSala)
    })
  }

  verForum(id){
    this.rout.navigate(["forum-list", id])
  }

}
