import ResponseError from 'lib/response-error'

const RequestsController = {}

RequestsController.create = async ({ req, res }) => {
  let trx
  try {
    const { currentUser, db } = req
    const { projectId } = req.params
    const reqPayload = req.body

    trx = await db.transaction()

    if (!reqPayload.title) {
      throw new ResponseError({
        code: 400,
        message: 'Please add a title to the request'
      })
    }
    if (!reqPayload.description) {
      throw new ResponseError({
        code: 400,
        message: 'Please add a description to the request'
      })
    }
    if (!reqPayload.type) {
      throw new ResponseError({
        code: 400,
        message: 'You forgot to select a type for the request'
      })
    }
    if (projectId) {
      throw new ResponseError({
        code: 400,
        message: 'Cannot go ahead without a Project'
      })
    }

    const dbPayload = {
      title: reqPayload.title,
      description: reqPayload.description,
      type: reqPayload.type,
      project_id: projectId
    }

    const insertion = await trx('requests').insert(dbPayload).returning(['id'])

    await trx.commit()
    res.send({
      data: insertion
    })
  } catch (err) {
    await trx.rollback()
    throw err
  }
}

RequestsController.get = ({ req, res }) => {
  try {
    // Get all asigned requests
  } catch (err) {
    throw err
  }
}

export default RequestsController
