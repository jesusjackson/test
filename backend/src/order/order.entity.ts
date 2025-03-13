import { Entity, PrimaryColumn, Column, Unique, BeforeInsert } from 'typeorm';
import { customAlphabet } from 'nanoid';

// The custom alphabet excludes ambiguous characters.
const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 10);

@Entity()
@Unique(['orderNumber'])
export class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  orderNumber: string;

  @Column()
  paymentDescription: string;

  @Column()
  streetAddress: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @Column('decimal')
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'timestamp' })
  paymentDueDate: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid();
  }
}
