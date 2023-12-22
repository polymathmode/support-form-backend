import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Pet.all()
  }

  public async store({ request, response }: HttpContextContract) {
    // const body = request.body()
    const newPetschema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: newPetschema })
    const pet = await Pet.create(payload)
    return response.status(200).json({
      message: `created pet`,
      name: pet,
    })
  }

  public async show({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    return pet
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body
    const pet = await Pet.findOrFail(params.id)
    pet.name = body.name
    return pet.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id)
    const del = pet.delete()
    return del
  }
}
