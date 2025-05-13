import { InvoiceEntity } from '@domain/model/entities/InvoiceEntity'
import { Money } from '@domain/model/valueObjects/Money'
import { InvoiceModel } from '@infra/services/internal/database/models/invoice/InvoiceModel'

export class InvoiceMapper {
  static toEntity(model: InvoiceModel): InvoiceEntity {
    return InvoiceEntity.create({
      customerNumber: model.customerNumber,
      referenceMonth: model.referenceMonth,
      electricityKwh: model.electricityKwh,
      electricityCost: new Money(model.electricityCost),
      sceeeEnergyKwh: model.sceeeEnergyKwh,
      sceeeEnergyCost: new Money(model.sceeeEnergyCost),
      compensatedEnergyKwh: model.compensatedEnergyKwh,
      compensatedEnergyCost: new Money(model.compensatedEnergyCost),
      lightingContribution: new Money(model.lightingContribution),
      amountToPay: new Money(model.amountToPay),
      downloadUrl: model.downloadUrl ?? undefined,
    })
  }

  static toModel(entity: InvoiceEntity): InvoiceModel {
    const model = new InvoiceModel()
    model.customerNumber = entity.customerNumber
    model.referenceMonth = entity.referenceMonth
    model.electricityKwh = entity.electricityKwh
    model.electricityCost = entity.electricityCost.getValue().toString()
    model.sceeeEnergyKwh = entity.sceeeEnergyKwh
    model.sceeeEnergyCost = entity.sceeeEnergyCost.getValue().toString()
    model.compensatedEnergyKwh = entity.compensatedEnergyKwh
    model.compensatedEnergyCost = entity.compensatedEnergyCost.getValue().toString()
    model.lightingContribution = entity.lightingContribution.getValue().toString()
    model.totalCostWithoutGd = entity.totalCostWithoutGd.getValue().toString()
    model.gdSavings = entity.gdSavings.getValue().toString()
    model.amountToPay = entity.amountToPay.getValue().toString()
    model.downloadUrl = entity.downloadUrl ?? null
    return model
  }
}
