export class MemorizeModel<T> {

  private memo: Map<string, T> = new Map<string, T>();

  constructor(public memory: T) {
    this.memo.set('', memory);
  }

  public getMemory(key: string): T | null {
    if (key === '' || !key.replace(/\s/g, '').length) {
      return this.memo.get('');
    }
    if (this.memo.has(key)) {
      return this.memo.get(key);
    }
    return null;
  }

  public setMemory(key: string, value: T) {
    if (!this.memo.has(key)) {
      this.memo.set(key, value);
    }
  }


}

