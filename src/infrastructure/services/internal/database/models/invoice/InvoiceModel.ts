import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('invoices')
export class InvoiceModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  customerNumber!: string

  @Column()
  referenceMonth!: string

  @Column()
  electricityKwh!: string

  @Column()
  electricityCost!: string

  @Column()
  sceeeEnergyKwh!: string

  @Column()
  sceeeEnergyCost!: string

  @Column()
  compensatedEnergyKwh!: string

  @Column()
  compensatedEnergyCost!: string

  @Column()
  lightingContribution!: string

  @Column()
  totalCostWithoutGd!: string

  @Column()
  gdSavings!: string

  @Column()
  amountToPay!: string

  @Column({ type: 'varchar', nullable: true })
  downloadUrl!: string | null
}
