import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  //event property
  @Output()
  public trainingStart = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  //methods
  public onStartTraining(): void
  {
    this.trainingStart.emit();
  }
}
