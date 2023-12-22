import { DateTime } from 'luxon'
import { BaseModel, column,HasMany,hasMany } from '@ioc:Adonis/Lucid/Orm'
import SupportRequest from './SupportRequest'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public email: string

  @column()
  public full_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime 

  @hasMany(() => SupportRequest)
   public supports: HasMany<typeof SupportRequest>
}

// app/Models/User.ts
// import { DateTime } from 'luxon'
// import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
// import Support from './Support'

// export default class User extends BaseModel {
//   @column({ isPrimary: true })
//   public id: number

//   // Other columns for the User model

//   @column.dateTime({ autoCreate: true })
//   public createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   public updatedAt: DateTime

//   // Define the relationship: a User has many Supports
//   @hasMany(() => Support)
//   public supports: HasMany<typeof Support>
// }

