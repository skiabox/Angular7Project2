import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()
  public trainingExit = new EventEmitter();

  public progress: number = 0;
  public timer: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  //methods
  public startOrResumeTimer()
  {
    this.timer = setInterval(() => {    //add interval to the timer
      this.progress = this.progress + 5;
      if (this.progress >= 100)
        clearInterval(this.timer);
    }, 1000);
  }

  public onStop(): void
  {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
      progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.trainingExit.emit();
      else
        this.startOrResumeTimer();
    });
  }

}
