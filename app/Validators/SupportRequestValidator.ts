
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SupportRequestValidator {
  validate(_arg0: Record<string, any>) {
      throw new Error('Method not implemented.')
  }
  hasErrors: any
  errors: any
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string({}, [rules.email()]),
    message_title: schema.string(),
    message_text: schema.string(),
    file: schema.file({
      size: '5mb', 
      extnames: ['jpg', 'jpeg', 'png', 'pdf', 'your-extension']
    }),
  })

  public messages = {}
}
