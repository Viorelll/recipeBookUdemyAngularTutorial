import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    private userSubscription: Subscription;
    
    isAuthenticated = false;

    /**
     *
     */
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.user
            .subscribe(user => {
                this.isAuthenticated = !!user;  //samel like ---    !user ? false : true;
                console.log(!user);
                console.log(!!user);
            });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
  
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}