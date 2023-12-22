
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportRequest from 'App/Models/SupportRequest'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

export default class SupportFormsController {
  public async index(ctx: HttpContextContract) {
    return SupportRequest.all()
  }

  public async store({ request, response }: HttpContextContract) {
    // Validation schema for the support request form
    const supportRequestSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email()]),
      message_title: schema.string({ trim: true }),
      message_text: schema.string({ trim: true }),
    //   file: schema.file({
    //     size: 5 * 1024 * 1024, // 5 megabytes in bytes
    //     extnames: ['jpg', 'jpeg', 'png', 'pdf'],
    //   }),
    })

    try {
      // Validate the support request form data
      const payload = await request.validate({ schema: supportRequestSchema })
      console.log("payloads", payload);

      // File upload
      const file = request.file('file')
      if (file) {
        // Saving the file to AdonisJS Drive
        const filePath = `/uploads/${file.clientName}`;
        await file.move(Application.tmpPath('uploads'), {
          name: file.clientName,
          overwrite: true,
        });

        // Update the payload with the file path
        Object.assign(payload, { file_path: filePath });
      }

      // Create a new support request
      const supportRequest = await SupportRequest.create(payload)

      return {
        status: 'success',
        message: 'Support request submitted successfully',
        data: supportRequest,
      }
    } catch (error) {
      // Handle validation errors
      return {
        status: 'error',
        errors: error.messages,
      }
    }
  }
}

