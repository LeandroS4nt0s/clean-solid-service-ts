export class Money {
  private readonly value: number

  constructor(value: string | number) {
    if (typeof value === 'string') {
      this.value = parseFloat(value.replace(/\./g, '').replace(',', '.'))
    } else {
      this.value = value
    }
  }

  public add(other: Money): Money {
    return new Money(this.value + other.value)
  }

  public toBRL(): string {
    return this.value.toFixed(2).replace('.', ',')
  }

  public getValue(): number {
    return this.value
  }
}
