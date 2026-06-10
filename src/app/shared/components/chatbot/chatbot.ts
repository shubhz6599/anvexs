import {
  Component, signal, ViewChild, ElementRef,
  AfterViewChecked, ChangeDetectionStrategy, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  private http = inject(HttpClient);

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = signal('');
  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! 👋 I\'m the Anvexs assistant. How can I help you today? I can answer questions about our IT services, pricing, or help you get in touch with our team.',
      timestamp: new Date(),
    }
  ]);

  private shouldScroll = false;

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  setInput(value: string) {
    this.userInput.set(value);
  }

  async sendMessage() {
    const text = this.userInput().trim();
    if (!text || this.isLoading()) return;

    // Add user message
    this.messages.update(msgs => [
      ...msgs,
      { role: 'user', content: text, timestamp: new Date() }
    ]);
    this.userInput.set('');
    this.isLoading.set(true);
    this.shouldScroll = true;

    try {
      const history = this.messages().map(m => ({ role: m.role, content: m.content }));
      // Remove the last user message we just added from history for the API call
      // (it's sent as the current message)
      const response = await this.http.post<{ reply: string }>(
        `${environment.apiUrl}/api/chat`,
        { messages: history }
      ).toPromise();

      this.messages.update(msgs => [
        ...msgs,
        { role: 'assistant', content: response?.reply || 'Sorry, I couldn\'t get a response.', timestamp: new Date() }
      ]);
    } catch (error) {
      this.messages.update(msgs => [
        ...msgs,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly on WhatsApp.',
          timestamp: new Date()
        }
      ]);
    } finally {
      this.isLoading.set(false);
      this.shouldScroll = true;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom() {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}
