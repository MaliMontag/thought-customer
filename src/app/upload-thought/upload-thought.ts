import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ThoughtService } from '../services/thought.service';
import { error } from 'console';
import { Users } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { Age } from '../models/age.model';
import { AgeService } from '../services/age.service';
import { Thought } from '../models/thought.model';
@Component({
  selector: 'app-upload-thought',
  imports: [ReactiveFormsModule],
  templateUrl: './upload-thought.html',
  styleUrl: './upload-thought.css',
})
export class UploadThought {
  selectedFile: File | null = null;
  ageOptions: Age[] = [];


  constructor(private router: Router,
    private _thoughtsService: ThoughtService,
    private route: ActivatedRoute,
    private _usersService: UsersService,
    private _ageService: AgeService,
    private cdRef: ChangeDetectorRef
  ) { }

  user: Users | null = null;
  thought!: Thought;

  ngOnInit(): void {
    //
    this.route.params.subscribe((params) => {
      //לרענן את התצוגה
          this.cdRef.detectChanges();
      const userIdString = localStorage.getItem('userId');
      if (userIdString) {
        const userId = +userIdString;
        this._usersService.getUserById(userId).subscribe({
          next: (res) => {
            this.cdRef.detectChanges();
            this.user = res;
          },
          error: (err) => {
            console.log("'no user is found");

            console.log(err);
          }
        });
      }
      else {
        console.warn('User ID not found in local storage. Redirecting to sign in.');
        this.router.navigate(['/signIn']);
      }
    })

    this._ageService.getAges().subscribe({
      next: (ages: Age[]) => {
        this.ageOptions = ages;
      },
      error: (err: any) => {
        console.error('Error fetching ages:', err);

      }

    });
  }

  OnFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  public uploadThoughtForm: FormGroup = new FormGroup({
    'title': new FormControl("", Validators.required),
    'desc': new FormControl("", Validators.required),
    'age': new FormControl("", Validators.required)
  });

  uploading() {
    console.log(this.uploadThoughtForm.value);
    const uploadData = new FormData();

    if (this.uploadThoughtForm.invalid || !this.user) {
      console.error('Form is invalid or user data is missing.');
      // אפשר להוסיף כאן לוגיקת טיפול בשגיאות
      return;
    }

    if (this.selectedFile) {
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const selectedAgeId: number = +this.uploadThoughtForm.get('age')!.value;
    const selectedAge: Age | undefined = this.ageOptions.find(a => a.id === selectedAgeId);
    // uploadData.append('title', this.uploadThoughtForm.get('title')!.value);
    // uploadData.append('desc', this.uploadThoughtForm.get('desc')!.value);
    // uploadData.append('age', this.uploadThoughtForm.get('age')!.value);
    // uploadData.append('userId', localStorage.getItem('userId')!);
    // uploadData.append('date', new Date().toISOString());
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //לסדר דחוף את אופן העלאת הנתונים פה!!!!!!!!!!!!
    this.thought = {
        id: 0, // מזהה יוגדר ב-Backend
        title: this.uploadThoughtForm.get('title')!.value,
        desc: this.uploadThoughtForm.get('desc')!.value,
        date: new Date(),
        user: this.user, // המשתמש המחובר
        age: selectedAge!, // הגיל שנבחר (נניח שהוא נמצא)
        // category: { id: 1, name: 'כללי' } as Category, // נניח שיש ברירת מחדל
        imagePath: '', // יוגדר ב-Backend
        image: '', // יוגדר ב-Backend
        responseList: [],
        likesList: []
    };
    this._thoughtsService.uploadingThought(this.thought).subscribe({
      next: (res) => {
        console.log(this.thought);

        console.log(res);
      },
      error: (err) => {
        console.log(this.thought);
        console.log(this.thought.user.id);

        console.log(err);
      }
    })
  }

}
