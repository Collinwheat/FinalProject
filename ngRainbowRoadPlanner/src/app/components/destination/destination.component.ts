import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Destination } from 'src/app/models/destination';
import { AuthService } from 'src/app/services/auth.service';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {


  destination: Destination = new Destination();
  editDestination: Destination | null = null;
  selected: Destination | null = null;
  destinations: Destination[] | null = null;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private destService: DestinationService
  ) { }

  ngOnInit() {


  }

 findByType(type: string){
  this.destService.showAllOfType(type).subscribe({
    next:(found)=>{
      this.destinations = found;
      console.log(this.destinations);

    },
    error: (failure) => {
      console.error('Error getting destination list');
      console.error(failure);
    }

  })





 }
showAll(){
  this.destService.showAll().subscribe({
    next:(destinationList)=>{
      this.destinations=destinationList;
    },
    error: (failure) => {
      console.error('Error getting destination list');
      console.error(failure);
    }
  })
}

updateDestination(dest: Destination){
  this.destService.update(dest).subscribe({
    next:(updated)=>{
    this.selected=updated;
    }
  })
}

createDestination(dest: Destination){
  this.destService.create(dest).subscribe({
    next:(madeDest)=>{
      this.selected=madeDest;
      // console.log(madeDest)
    }

  })
}

deleteDestination(id: number){
  this.destService.destroy(id).subscribe({

    next: () =>{

    },
    error: (failure) => {
      console.error('Error getting todo list');
      console.error(failure);
    }
  })


}
















}
