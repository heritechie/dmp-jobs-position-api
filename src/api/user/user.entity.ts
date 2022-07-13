import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public username!: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public email: string | null;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;
}
