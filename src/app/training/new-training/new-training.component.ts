import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Excercise } from '../excercise.model';
import { map } from 'rxjs/operators';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[];
  excerciseSubscription: Subscription;
  constructor(
      private trainingService: TrainingService
    ) { }

  ngOnInit(){
    this.excerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      excercises => {this.excercises = excercises}
    );
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.excercise);
  }

  ngOnDestroy() {
    this.excerciseSubscription.unsubscribe();
  }

}
