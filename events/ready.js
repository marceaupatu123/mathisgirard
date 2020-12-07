module.exports = async client => {
    const mongo = require("../mongo")
// https://www.youtube.com/watch?v=Bg1d2ho2pgY
    await mongo().then(mongoose => {
        try {
          console.log("Connected")
        } catch (err){
            console.log(err)
        }
        finally {
          mongoose.connection.close()
        }
      })

    console.log(`Le bot est allumé sur ${client.guilds.cache.size} serveurs.`)
}