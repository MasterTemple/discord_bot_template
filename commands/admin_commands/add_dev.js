module.exports = {
    name: ['adddev'],
    description: 'Give a user devistrator permissions',
    use: 'adddev [user_id/@mention]',
    example:['adddev 703120460023463986', 'adddev @MasterTemple'],
    notes: 'Give a user developer permissions',
    async execute(settings, message, args) {
        let new_dev_mentions = []
        let new_dev_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            new_dev_mentions.push(each_mention.id)
        })

        settings.config.developers.push(...new_dev_mentions, ...new_dev_ids)
        settings.config.developers = [...new Set(settings.config.developers)]
        message.channel.send("Done ✅")
        await settings.fs.writeFile("config.json", JSON.stringify(settings.config, null, 2), function (err) {
                if (err) throw err;
            }
        );
    }
}