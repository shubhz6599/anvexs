import {
  Component, signal, ViewChild, ElementRef,
  AfterViewChecked, ChangeDetectionStrategy, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../core/services/api.service';


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

  private chatbotService = inject(ChatbotService);

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
      const response = await this.chatbotService.askQuestion(text);

      this.messages.update(msgs => [
        ...msgs,
        {
          role: 'assistant',
          content: response.answer || 'Sorry, I could not generate a response.',
          timestamp: new Date()
        }
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
    } catch { }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
}
