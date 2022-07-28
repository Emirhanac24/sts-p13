const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "unjail",
    aliases: ["unreklam", "karantina-çıkart", "uj", "ceza-kaldır"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.roles.cache.has(config.penals.jail.staff) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (config.penals.jail.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.jail.limit) return message.reply({ embeds: [embed.setDescription("Saatlik özel rol verme sınırına ulaştın!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Bu komutu kendinizde kullanamazsınız.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let rol = await db.get(`roles.${member.id}`);
        let nick = await db.get(`isim.${member.id}`)
        db.delete(`jail_${member.id}`)
        member.roles.set(rol).catch(e => { });
        member.setNickname(nick)
        guild.members.cache.get(member.id).roles.remove(config.penals.jail.roles);
        
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından karantinadan çıkarıldı.`)] }).catch((err) => console.log(err), client.ytick(message))
        client.channels.cache.get(config.penals.jail.log).send({ embeds: [embed.setDescription(`     
        ${member} kullanıcısı ${author} tarafından karantinadan çıkarıldı.
             
        Kullanıcı: ${member} - \`(${member.id})\`
        Yetkili: ${author} - \`(${author.id})\`
        Tarih: \`Bulunamadı.\``)] });   
        db.delete(`roles.${member.id}`);
        db.delete(`isim.${member.id}`);
        if (config.penals.jail.limit > 0) {
            if (!limit.has(author.id)) limit.set(author.id, 1);
            else limit.set(author.id, limit.get(author.id) + 1);
            setTimeout(() => {
                if (limit.has(author.id)) limit.delete(author.id);
            }, 1000 * 60 * 60)
        };
    }
};
