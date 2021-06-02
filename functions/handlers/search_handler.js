module.exports = {
    execute(search_type, return_one, args) {
        let search_for = []
        for (var i = 0; i < args.length; i++) {
            search_for.push(args[i]?.toLowerCase())
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
                    return match.id
                } catch {
                    let sql_search_file = require(`./../../output/references/sql_${search_type}.json`)

                    let match = sql_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el) + e?.displayName?.toLowerCase().includes(el)
                    }))
                    return match.id
                }
            } else {
                let results = []
                locale_search_file.forEach(function(each_object){
                    let match = search_for.every(function (el) {
                        return each_object?.name?.toLowerCase().includes(el)
                    })
                    if(match){
                        results.push(each_object)
                    }
                })
                if(results.length !== 0) {
                    return results
                }else {
                    let sql_search_file = require(`./../../output/references/sql_${search_type}.json`)

                    sql_search_file.forEach(function(each_object){
                        let match = search_for.every(function (el) {
                            return each_object?.name?.toLowerCase().includes(el) + each_object?.displayName?.toLowerCase().includes(el)
                        })
                        if(match){
                            results.push(each_object)
                        }
                    })
                }
            }
        }catch(e){
            console.log(e)
        }
    }
}