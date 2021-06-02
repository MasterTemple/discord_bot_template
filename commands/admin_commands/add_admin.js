module.exports = {
    name: ['addadmin'],
    description: 'Give a user administrator permissions',
    use: 'addadmin [user_id]',
    example:['addadmin 703120460023463986', 'addadmin @MasterTemple'],
    notes: 'Give a user administrator permissions',
    async execute(settings, message, args) {
        let new_admin_mentions = []
        let new_admin_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            new_admin_mentions.push(each_mention.id)
        })

        settings.config.admin_users.push(...new_admin_mentions, ...new_admin_ids)
        settings.config.admin_users = [...new Set(settings.config.admin_users)]
        message.channel.send("Done ✅")
        await settings.fs.writeFile("config.json", JSON.stringify(settings.config, null, 2), function (err) {
                if (err) throw err;
            }
        );
    }
}