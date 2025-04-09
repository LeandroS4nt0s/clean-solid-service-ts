import { Money } from '@domain/model/valueObjects/Money'

export class InvoiceEntity {
  constructor(
    public readonly customerNumber: string,
    public readonly referenceMonth: string,
    public readonly electricityKwh: string,
    public readonly electricityCost: Money,
    public readonly sceeeEnergyKwh: string,
    public readonly sceeeEnergyCost: Money,
    public readonly compensatedEnergyKwh: string,
    public readonly compensatedEnergyCost: Money,
    public readonly lightingContribution: Money,
    public readonly totalCostWithoutGd: Money,
    public readonly gdSavings: Money,
    public readonly amountToPay: Money,
    public readonly downloadUrl?: string
  ) {}

  static create(data: Omit<InvoiceEntity, 'totalCostWithoutGd' | 'gdSavings'>): InvoiceEntity {
    const electricityCost = new Money(data.electricityCost as unknown as string)
    const sceeeEnergyCost = new Money(data.sceeeEnergyCost as unknown as string)
    const lightingContribution = new Money(data.lightingContribution as unknown as string)
    const compensatedEnergyCost = new Money(data.compensatedEnergyCost as unknown as string)
    const amountToPay = new Money(data.amountToPay as unknown as string)

    const totalCostWithoutGd = electricityCost.add(sceeeEnergyCost).add(lightingContribution)
    const gdSavings = compensatedEnergyCost

    return new InvoiceEntity(
      data.customerNumber,
      data.referenceMonth,
      data.electricityKwh,
      electricityCost,
      data.sceeeEnergyKwh,
      sceeeEnergyCost,
      data.compensatedEnergyKwh,
      compensatedEnergyCost,
      lightingContribution,
      totalCostWithoutGd,
      gdSavings,
      amountToPay,
      data.downloadUrl
    )
  }
}
