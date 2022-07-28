const moment = require("moment");
require("moment-duration-format");
const config = require("../../../config.json");
module.exports = {
    name: "uptime-süresi",
    aliases: ["uptime"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        message.reply({ content: `
Bot" **${moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]')}** Süre Boyunca Aktif "`}) 
    }
}
