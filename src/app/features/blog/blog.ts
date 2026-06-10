import {
  Component, AfterViewInit, OnDestroy,
  inject, signal, computed, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, SlicePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { BlogService } from '../../core/services/api.service';
import { NotificationService } from '../../core/services/notification.service';

interface WisdomCard {
  id: number;
  word: string;
  topic: string;
  topicKey: string;
  category: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  reflection: string;
  unlocked: boolean;
}

interface Tile {
  index: number;
  letter: string;
  used: boolean;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, SlicePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit, OnDestroy {
  private reveal     = inject(RevealService);
  private blog       = inject(BlogService);
  private notify     = inject(NotificationService);
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // ── Newsletter ─────────────────────────────────────────────────
  nlEmail = '';
  nlSent  = signal(false);
  nlBusy  = signal(false);
  nlError = signal('');

  // ── All cards (mutable via update for unlocked flag) ──────────
  private _cards = signal<WisdomCard[]>([
    {
      id: 0, word: 'PROGRESS', topic: 'AI & HUMANITY', topicKey: 'AI',
      category: '🤖 AI & HUMANITY',
      quote: 'Technology is neither good nor bad; nor is it neutral. It is progress with consequences we must choose to understand.',
      name: 'Satya Nadella', title: 'CEO, Microsoft', avatar: '🧠',
      reflection: 'Every breakthrough carries a shadow. The question is who gets to stand in the light.',
      unlocked: false
    },
    {
      id: 1, word: 'ATTENTION', topic: 'DIGITAL ADDICTION', topicKey: 'ADDICTION',
      category: '📱 DIGITAL ADDICTION',
      quote: 'We\'ve created tools that are ripping apart the social fabric of how society works. The short-term, dopamine-driven feedback loops we\'ve created are destroying how society works.',
      name: 'Chamath Palihapitiya', title: 'Former VP Growth, Facebook', avatar: '⚠️',
      reflection: 'The man who built the like button now warns us about it. Listen.',
      unlocked: false
    },
    {
      id: 2, word: 'PRIVACY', topic: 'PRIVACY & POWER', topicKey: 'PRIVACY',
      category: '🔐 PRIVACY & POWER',
      quote: 'Privacy is a fundamental human right and the foundation of individual freedom. When you give up privacy, you give up power over your own life.',
      name: 'Tim Cook', title: 'CEO, Apple', avatar: '🍎',
      reflection: 'Your data is not the product — you are. The platform is just the marketplace.',
      unlocked: false
    },
    {
      id: 3, word: 'AUTOMATION', topic: 'FUTURE OF WORK', topicKey: 'FUTURE',
      category: '🚀 FUTURE OF WORK',
      quote: 'The automation of jobs is not the end of work. It is the end of meaningless work — if we build the transition correctly.',
      name: 'Jensen Huang', title: 'CEO, NVIDIA', avatar: '⚡',
      reflection: 'Robots don\'t take jobs. Complacency does. Reskill or be replaced — that\'s the brutal math.',
      unlocked: false
    },
    {
      id: 4, word: 'CARBON', topic: 'CLIMATE & TECH', topicKey: 'CLIMATE',
      category: '🌍 CLIMATE & TECH',
      quote: 'By 2030 a single AI training run could consume as much energy as a small country. We cannot innovate our way out of a crisis we innovate our way into.',
      name: 'Sundar Pichai', title: 'CEO, Google', avatar: '🌿',
      reflection: 'The data center that serves your query leaves a footprint. Intelligence must be made sustainable.',
      unlocked: false
    },
    {
      id: 5, word: 'BIAS', topic: 'ETHICS & BIAS', topicKey: 'ETHICS',
      category: '⚖️ ETHICS & BIAS',
      quote: 'Algorithms are opinions embedded in code. If you don\'t audit them, you amplify every prejudice of the people who wrote them.',
      name: 'Cathy O\'Neil', title: 'Author, Weapons of Math Destruction', avatar: '📊',
      reflection: 'Neutral code is a myth. Every dataset is a historical record — and history is never unbiased.',
      unlocked: false
    },
    {
      id: 6, word: 'DISRUPTION', topic: 'AI & HUMANITY', topicKey: 'AI',
      category: '🤖 AI & HUMANITY',
      quote: 'AI will not replace managers. Managers who use AI will replace managers who don\'t. The same is true for every profession.',
      name: 'Marc Andreessen', title: 'Co-founder, Andreessen Horowitz', avatar: '💡',
      reflection: 'The Industrial Revolution replaced muscle. The AI Revolution replaces cognitive routine. Guard your creativity.',
      unlocked: false
    },
    {
      id: 7, word: 'SCREEN', topic: 'DIGITAL ADDICTION', topicKey: 'ADDICTION',
      category: '📱 DIGITAL ADDICTION',
      quote: 'We are building a world where the first instinct of a human being is to reach for a device, not for another human. That should terrify us.',
      name: 'Tristan Harris', title: 'Co-founder, Center for Humane Technology', avatar: '🧩',
      reflection: 'Loneliness is the epidemic. The phone is both cause and symptom. Connection requires presence.',
      unlocked: false
    },
    {
      id: 8, word: 'CONSENT', topic: 'PRIVACY & POWER', topicKey: 'PRIVACY',
      category: '🔐 PRIVACY & POWER',
      quote: 'Clicking "I agree" on a 30-page terms document is not consent. It\'s surrender. And we built a trillion-dollar industry on that surrender.',
      name: 'Shoshana Zuboff', title: 'Author, Surveillance Capitalism', avatar: '📖',
      reflection: 'The currency of the digital age is not money — it\'s behavioral data extracted without genuine agreement.',
      unlocked: false
    },
    {
      id: 9, word: 'RESKILL', topic: 'FUTURE OF WORK', topicKey: 'FUTURE',
      category: '🚀 FUTURE OF WORK',
      quote: 'The half-life of a technical skill is now less than five years. Companies that don\'t build learning cultures will build obsolete workforces.',
      name: 'Ginni Rometty', title: 'Former CEO, IBM', avatar: '🎓',
      reflection: 'Static expertise is a liability in an exponential world. The best investment is in minds that keep growing.',
      unlocked: false
    },
    {
      id: 10, word: 'FOOTPRINT', topic: 'CLIMATE & TECH', topicKey: 'CLIMATE',
      category: '🌍 CLIMATE & TECH',
      quote: 'Every byte we store, every model we train, and every stream we watch has an energy cost hidden in data centers we never see. Visibility is the first step to responsibility.',
      name: 'Elon Musk', title: 'CEO, Tesla & SpaceX', avatar: '🔋',
      reflection: 'Green software is the next frontier. Clean code should mean carbon-clean too.',
      unlocked: false
    },
    {
      id: 11, word: 'EMPATHY', topic: 'ETHICS & BIAS', topicKey: 'ETHICS',
      category: '⚖️ ETHICS & BIAS',
      quote: 'You cannot write ethical AI without diverse teams. Empathy is not a soft skill — it is the engineering requirement we have ignored for thirty years.',
      name: 'Timnit Gebru', title: 'Founder, DAIR Institute', avatar: '🌐',
      reflection: 'The people missing from the room when code is written end up missing from what the code can see.',
      unlocked: false
    },
  ]);

  // ── Puzzle state signals ───────────────────────────────────────
  currentIndex  = signal(0);
  scrambledTiles = signal<Tile[]>([]);
  answerSlots   = signal<string[]>([]);
  feedbackMsg   = signal('');
  feedbackType  = signal<'success' | 'error' | ''>('');
  hintText      = signal('Click tiles to unscramble the hidden word');
  shaking       = signal(false);
  private hintCount = 0;

  // ── Computed ───────────────────────────────────────────────────
  readonly totalCards = this._cards().length;

  currentCard = computed(() => this._cards()[this.currentIndex()]);

  unlockedCards = computed(() => this._cards().filter(c => c.unlocked));

  progressPct = computed(() =>
    (this._cards().filter(c => c.unlocked).length / this.totalCards) * 100
  );

  // ── Lifecycle ──────────────────────────────────────────────────
  ngAfterViewInit() {
    this.reveal.init();
    if (!this.isBrowser) return;
    this.loadPuzzle(0);
  }

  ngOnDestroy() { this.reveal.destroy(); }

  // ── Navigation ─────────────────────────────────────────────────
  nextPuzzle() { this.loadPuzzle((this.currentIndex() + 1) % this.totalCards); }
  prevPuzzle() { this.loadPuzzle((this.currentIndex() - 1 + this.totalCards) % this.totalCards); }

  // ── Core puzzle logic ──────────────────────────────────────────
  private loadPuzzle(index: number) {
    this.currentIndex.set(index);
    const word = this._cards()[index].word;

    this.answerSlots.set(Array(word.length).fill(''));
    this.scrambledTiles.set(this.buildTiles(word));
    this.feedbackMsg.set('');
    this.feedbackType.set('');
    this.hintText.set('Click tiles to unscramble the hidden word');
    this.hintCount = 0;
  }

  private buildTiles(word: string): Tile[] {
    const arr = word.split('');
    // Fisher-Yates shuffle, guarantee different order
    let attempts = 0;
    do {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      attempts++;
    } while (arr.join('') === word && attempts < 10);

    return arr.map((letter, index) => ({ index, letter, used: false }));
  }

  reshuffleTiles() {
    const word = this._cards()[this.currentIndex()].word;
    this.answerSlots.set(Array(word.length).fill(''));
    this.scrambledTiles.set(this.buildTiles(word));
    this.feedbackMsg.set('');
    this.feedbackType.set('');
  }

  onTileClick(tileIndex: number) {
    const tiles = this.scrambledTiles();
    const tile  = tiles[tileIndex];
    if (tile.used) return;

    const slots   = [...this.answerSlots()];
    const nextEmpty = slots.indexOf('');
    if (nextEmpty === -1) return;

    // Fill the slot
    slots[nextEmpty] = tile.letter;
    this.answerSlots.set(slots);

    // Mark tile as used
    this.scrambledTiles.update(t =>
      t.map((t2, i) => i === tileIndex ? { ...t2, used: true } : t2)
    );

    // Auto-check when all slots filled
    if (!slots.includes('')) {
      setTimeout(() => this.checkAnswer(), 300);
    }
  }

  onSlotClick(slotIndex: number) {
    const slots  = [...this.answerSlots()];
    const letter = slots[slotIndex];
    if (!letter) return;

    // Restore the first matching unused... actually find first used tile with this letter
    let restored = false;
    this.scrambledTiles.update(tiles =>
      tiles.map(t => {
        if (!restored && t.used && t.letter === letter) {
          restored = true;
          return { ...t, used: false };
        }
        return t;
      })
    );

    slots[slotIndex] = '';
    this.answerSlots.set(slots);
    this.feedbackMsg.set('');
    this.feedbackType.set('');
  }

  checkAnswer() {
    const card    = this._cards()[this.currentIndex()];
    const attempt = this.answerSlots().join('');

    if (attempt === card.word) {
      this.feedbackMsg.set('✓ Correct! Unlocking insight…');
      this.feedbackType.set('success');

      // Unlock card by updating the signal array
      setTimeout(() => {
        this._cards.update(cards =>
          cards.map(c => c.id === card.id ? { ...c, unlocked: true } : c)
        );
      }, 600);

    } else {
      this.feedbackMsg.set('✗ Not quite — try again');
      this.feedbackType.set('error');
      this.shaking.set(true);
      setTimeout(() => this.shaking.set(false), 500);
    }
  }

  giveHint() {
    const card    = this._cards()[this.currentIndex()];
    const slots   = [...this.answerSlots()];
    const nextSlot = slots.indexOf('');
    if (nextSlot === -1 || this.hintCount >= card.word.length) return;

    const correctLetter = card.word[nextSlot];
    let placed = false;

    this.scrambledTiles.update(tiles =>
      tiles.map(t => {
        if (!placed && !t.used && t.letter === correctLetter) {
          placed = true;
          return { ...t, used: true };
        }
        return t;
      })
    );

    if (placed) {
      slots[nextSlot] = correctLetter;
      this.answerSlots.set(slots);
      this.hintCount++;
      this.hintText.set(`Hint used (${this.hintCount}/${card.word.length})`);

      if (!slots.includes('')) {
        setTimeout(() => this.checkAnswer(), 300);
      }
    }
  }

  // ── Newsletter ─────────────────────────────────────────────────
  subscribe() {
    if (!this.nlEmail || !this.nlEmail.includes('@')) {
      this.nlError.set('Please enter a valid email address');
      return;
    }
    this.nlError.set('');
    this.nlBusy.set(true);

    this.blog.subscribe(this.nlEmail).subscribe({
      next: () => {
        this.nlSent.set(true);
        this.notify.success('Subscribed! First issue arrives Tuesday.');
        this.nlBusy.set(false);
      },
      error: (err: any) => {
        if (err.status === 200 || err.error?.message?.includes('already')) {
          this.nlSent.set(true);
        } else {
          this.nlError.set(err.error?.message || 'Subscription failed. Try again.');
        }
        this.nlBusy.set(false);
      }
    });
  }
}
