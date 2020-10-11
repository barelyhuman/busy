const TeamsController = {}

TeamsController.create = async ({ req, res }) => {
  let trx

  try {
    const { db, currentUser } = req
    const reqPayload = req.body
    const dbPayload = {
      name: reqPayload.name,
      slug: reqPayload.slug
    }

    trx = await db.transaction()

    const teamInsertion = await trx('teams')
      .insert(dbPayload)
      .returning(['id'])

    const mappingPayload = {
      user_id: currentUser.id,
      role: 'owner',
      team_id: teamInsertion[0].id
    }

    await trx('teams').insert(mappingPayload).returning(['id'])

    await trx.commit()

    return {
      data: teamInsertion
    }
  } catch (err) {
    await trx.rollback()
    throw err
  }
}

TeamsController.delete = async ({ req, res }) => {
  let trx
  try {
    const { db, currentUser } = req

    const { id } = req.params

    trx = await db.transaction()

    const ownedTeam = await trx('teams').where({
      created_by: currentUser.id,
      id: id
    })

    if (!ownedTeam.length) {
      throw new ResponseError({ code: 400, message: "Invalid Request, coun't find team" })
    }

    if (ownedTeam) {
      await trx('teams').where({
        created_by: currentUser.id,
        id: id
      }).del()
    }

    await trx.commit()

    return {
      message: 'Deleted'
    }
  } catch (err) {
    await trx.rollback()
    throw err
  }
}

TeamsController.get = async ({ req, res }) => {
  const { db, currentUser } = req

  const memberOfTeams = await db('teams')
    .leftJoin('teams', 'teams_users_mapping.team_id', 'teams.user_id')
    .where({ 'teams.user_id': currentUser.id })
    .select('teams.*')

  return res.send({
    data: memberOfTeams
  })
}

export default TeamsController
