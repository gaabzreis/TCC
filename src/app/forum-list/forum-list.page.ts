import { Component, OnInit } from '@angular/core';
import { forum, resp, ForumServiceService } from '../services/forum-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.page.html',
  styleUrls: ['./forum-list.page.scss'],
})
export class ForumListPage implements OnInit {
  idForum = this.router.snapshot.params['sala-aula']
  forum : forum
  constructor(private provider : ForumServiceService, private router : ActivatedRoute) { }

  ngOnInit() {
    this.provider.getByFilter(this.idForum).subscribe(res => {
      this.forum = res
    })
  }

}
