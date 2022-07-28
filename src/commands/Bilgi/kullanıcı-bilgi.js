const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name: "kullanıcı-bilgi",
    aliases: ["me", "bilgi", "kb"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    
        var hedef = message.mentions.users.first() || guild.members.cache.get(args[0]) || author;
        let kke = db.get(`kke_${hedef.id}`) || "Bulunamadı";
        let erkek = db.get(`erkek_${hedef.id}`) || 0;
        let kadın = db.get(`kadın_${hedef.id}`) || 0;
        let toplam = db.get(`toplam_${hedef.id}`) || 0;
        let tjail = db.get(`sjail_${hedef.id}`) || 0;
        let tmute = db.get(`scmute_${hedef.id}`) || 0;
        let twarn = db.get(`smute_${hedef.id}`) || 0;
        message.reply({ embeds: [embed.setDescription(`**➥ Kullanıcı Bilgileri**
        
• Kullanıcı: (<@${hedef.id}>-\`${hedef.id}\`)
• Hesap Kurulum Tarihi: \`${moment(hedef.createdAt).format('D MMMM YYYY')}\`
• Sunucuya Katılma Tarihi: \`${moment(hedef.joinedAt).format('D MMMM YYYY')}\`

**➥ Ceza Verisi**
Toplam Jail: **${tjail}**
Toplam Mute: **${tmute}**
Toplam Warn: **${twarn}**

**➥ Yetkili Verisi**
Toplam Kayıt: **${toplam}** 
Erkek Kayıt: **${erkek}**
Kadın Kayıt: **${kadın}**

**➥ Kayıt Verisi**
${kke}
`)] });

    }
}
