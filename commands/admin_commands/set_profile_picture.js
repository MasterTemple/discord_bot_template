module.exports = {
    name: ['setpfp'],
    description: 'Sets the bot\'s profile picture',
    use: 'setpfp [url]',
    example:['setpfp https://media.discordapp.net/attachments/641133444746838016/813621671461781544/circle-cropped_1.png'],
    notes: 'Sets the bot\'s profile picture',
    async execute(settings, message, args) {

        let link
        const client = message.client
        if(args.length === 1) {
            link = args[0]
        }else if(message.attachments){
            //i know this wont work right if someone sends multiple but idk how maps work in js and if you send multiple attachments you have a problem
            message.attachments.forEach((each_attachment) => {
                link = each_attachment.url
            })
        }else{
            message.channel.send("Failed ❌")
            return
        }

        try{
            await client.user.setAvatar(link)
            settings.config.bot_icon_url = link
            message.channel.send("Done ✅")
            settings.fs.writeFile("config.json", JSON.stringify(settings.config,null,2), function(err) {
                    if (err) throw err;
                }
            );
        }catch(e){
            message.channel.send("Failed ❌")

        }
    }
}