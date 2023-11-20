import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  runLog(content: string) {
    const newContent = signal(content);
    newContent.update(value => value + " new part");
    console.log(newContent());

    const count: WritableSignal<number> = signal(5);
    let doubleCount: Signal<number> = computed(() => count());
    console.log(doubleCount())
    doubleCount = computed(()=> count() * 2)
    console.log(doubleCount());
}
  constructor() { }
}

export class betterLogger extends LoggerService{
  betterLog(content: string){
    const newContent = signal(content);
    console.log(newContent);
  }
}
