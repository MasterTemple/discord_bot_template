module.exports = {
    execute(search_type, return_one, args) {
        let search_for = []
        for (var i = 0; i < args.length; i++) {
            search_for.push(args[i].toLowerCase())
        }
        search_for.sort()
        if(search_for.length === 1 && !isNaN(search_for[0])){
            return search_for[0]
        }
        try {
            let locale_search_file = require(`./../../output/references/${search_type}.json`)
            if (return_one) {
                try {
                    let match = locale_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el)
                    }))
                    return match?.id
                } catch {
                    let sql_search_file = require(`./../search/sql_${search_type}.json`)

                    let match = sql_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el) + e?.displayName?.toLowerCase().includes(el)
                    }))
                    return match?.id
                }
            } else {
                try {
                    let match = locale_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el)
                    }))
                    return match?.id
                } catch {
                    let sql_search_file = require(`./../search/sql_${search_type}.json`)

                    let match = sql_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el) + e?.displayName?.toLowerCase().includes(el)
                    }))
                    return match?.id
                }
            }
        }catch(e){
            console.log(e)
        }
    }
}