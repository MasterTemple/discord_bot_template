module.exports = {
    name: ['test'],
    description: 'Test a feature',
    use: 'test',
    example:['test'],
    notes: 'This is a command used for testing purposes',
    async execute(settings, message, args) {

        //let link_button = settings.button_retriever(settings.buttons, 'link', 'Test Label', {url: 'http://www.google.com'})
        let test_button = settings.button_retriever(settings.buttons, 'test_button', 'Clicks: 0', {})

        let sent_message = await message.channel.send('tested', {buttons: [test_button], embed: undefined})
        settings.message_info[sent_message.id] = {clicks: 0, buttons: [test_button]}
        setTimeout(() => delete settings.message_info[sent_message.id], 300000) //deletes the info after 5 minutes

    }
}
