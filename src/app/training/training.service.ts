import { Excercise } from "./excercise.model";
import { Subject } from "rxjs";
import { ThrowStmt } from "@angular/compiler";

export class TrainingService{
    
    private availableExcercises: Excercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    
    private runningExcercise: Excercise;
    excerciseChanged = new Subject<Excercise>();
    private excercises: Excercise[] = [];
    getAvailableExcercises() {
        return this.availableExcercises.slice();
    }
    
    startExcercise(selectedId: string) {
        this.runningExcercise = this.availableExcercises.find(ex => ex.id == selectedId);
        this.excerciseChanged.next({...this.runningExcercise})

    }

    getRunningExcercise() {
        return {...this.runningExcercise};
    }

    getCompletedorCancelledExcercises() {
        return this.excercises.slice();
    }

    completeExcercise() {
        this.excercises.push({...this.runningExcercise, date: new Date(), state: 'completed'});
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    cancelExcercise(progress: number) {
        this.excercises.push({
            ...this.runningExcercise, 
            duration: this.runningExcercise.duration * (progress/100),
            calories: this.runningExcercise.calories * (progress/100),
            date: new Date(), 
            state: 'cancelled'});
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

}