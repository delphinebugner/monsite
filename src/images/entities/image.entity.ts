import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  src: string;

  @Column()
  title: string;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ nullable: true })
  tags?: string;

  @Column({ nullable: true })
  description?: string;
}
