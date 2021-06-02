module.exports = {
    execute(info_file, config) {

        /*
        this is literally copy pasted from the old version
        i will rewrite this later lol
         */


        const buyFile = info_file
        let fields = []

        if(buyFile.itemComponent.levelRequirement === undefined){
            buyFile.levelRequirement = 0
        }

        if(buyFile.itemComponent.altCurrencyCost !== null){
            fields.push(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: `${buyFile.itemComponent.altCurrencyDisplayName} Cost`, value: buyFile.itemComponent.altCurrencyCost, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }else if(buyFile.itemComponent.commendationCurrencyCost !== null){
            fields.push(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: `${buyFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: buyFile.itemComponent.commendationCurrencyCost, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }else if(buyFile.itemComponent.commendationCurrencyCost === null){
            fields.push(
                {name: "Cost", value: buyFile.itemComponent.buyPrice, inline: true},
                {name: "Stack Size", value: buyFile.itemComponent.stackSize, inline: true},
                {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement, inline: true},
            )
        }

        var vendorInfo = ``
        if(buyFile.buyAndDrop?.Vendors?.length === 0){
            buyFile.buyAndDrop.Vendors = []
        }
        if(buyFile.commendationVendor===undefined){
            buyFile.commendationVendor = []
        }
        for(var e=0;e<buyFile.buyAndDrop.Vendors.length;e++){
            if(buyFile.buyAndDrop.Vendors[e].displayName !== null) {
                vendorInfo = `${vendorInfo}${buyFile.buyAndDrop.Vendors[e].displayName} [[${buyFile.buyAndDrop.Vendors[e].id}]](${config.explorer_link_domain}objects/${buyFile.buyAndDrop.Vendors[e].id}/16)\n`
            }
        }

        if(buyFile.buyAndDrop.Vendors.length === 1){
            fields.push({name: `Vendor:`, value: vendorInfo, inline: false})
        }else if(buyFile.buyAndDrop.Vendors.length > 1){
            fields.push({name: `Vendors:`, value: vendorInfo, inline: false})
        }else if(buyFile.commendationVendor.length === 1 && buyFile.commendationCost !== null){
            fields.push({
                name: `Vendor:`,
                value: `Honor Accolade - Commendation Vendor [[13806]](${luExplorerURL}objects/13806/16`,
                inline: false
            })
        }else if(buyFile.type === "LEGO brick"){
            fields.push({
                name: `Vendor:`,
                value: `${buyFile.brickVendorDisplayName} [${buyFile.brickVendorID}]`,
                inline: false
            })
        }else{
            fields.push({
                name: `This Item Is Not Sold!`,
                value: "Try **!earn** or **!drop** to see how to unlock this item!",
                inline: false
            })
        }
        return fields

    }
}
