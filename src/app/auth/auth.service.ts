import { Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AUthData } from "./auth-data.model";
import { User } from "./user.model";
import {AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
    authChange = new Subject<Boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private afAuth:AngularFireAuth,
        private trainingService:TrainingService) {}
    
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(["/training"]);    
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(["/login"]);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AUthData) {
        this.afAuth
            .createUserWithEmailAndPassword(
                authData.email,
                authData.password
            ).then(result => {                
            })
            .catch(error => {
                console.log(error);
            })
    }

    login(authData: AUthData) {
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then( result => {
            console.log(result);
            }).catch(error => {
            console.log(error);
        });
        
    }

    logout() {
        this.afAuth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}