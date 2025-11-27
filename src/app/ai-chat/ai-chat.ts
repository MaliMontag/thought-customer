import { Component } from '@angular/core';
import { Thought } from '../models/thought.model';
import { ThoughtService } from '../services/thought.service';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'assistant' | 'error';
  text: string;
}

@Component({
  selector: 'app-ai-chat',
  imports: [FormsModule],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css',
})
export class AiChat {
messages: ChatMessage[] = [];

currentMessage: string = '';

  // מזהה שיחה - ניתן לאתחל חדש בכל פעם או לשמור אחד קבוע לכל הצ'אט
  conversationId: string = 'unique-session-id'; 

  // משתנה עזר למניעת שליחות כפולות והצגת הודעת טעינה
  isSending: boolean = false;


  constructor(private thoughtService:ThoughtService ) {
    // אתחול צ'אט בהודעה ראשונה מהמערכת (אופציונלי)
    this.messages.push({ role: 'assistant', text: 'שלום, איך אוכל לסייע לך?' });
  }

  /**
   * פונקציה לשליחת ההודעה הנוכחית לשרת
   */
  sendMessage(): void {
    if (!this.currentMessage || this.isSending) {
      return;
    }

    const userMessageText = this.currentMessage;
    
    // 1. הוספת הודעת המשתמש להיסטוריה
    this.messages.push({ role: 'user', text: userMessageText });
    
    // איפוס שדה הקלט
    this.currentMessage = '';
    this.isSending = true; // הפעלת מצב שליחה

    // 2. קריאה ל-Service
    this.thoughtService.sendChatRequest(userMessageText, this.conversationId)
      .subscribe({
        next: (responseText: string) => {
          // 3. הצגת תשובת המערכת
          this.messages.push({ role: 'assistant', text: responseText });
          this.isSending = false;
        },
        error: (err) => {
          // 4. טיפול בשגיאה והצגת הודעה למשתמש
          console.error('Chat error:', err);
          this.messages.push({ role: 'error', text: 'אירעה שגיאה בשרת. נסה שוב.' });
          this.isSending = false;
        }
        // (אם ה-Service שלך מטפל ב-catchError ומחזיר מחרוזת שגיאה: אז השתמש ב-complete במקום error)
      });
  }
}
