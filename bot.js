const Discord = require('discord.js');
const dotenv = require("dotenv");
const util = require('util');
dotenv.config({ path: __dirname + "/.env" });
const client = new Discord.Client();
var messageId = 0;
var verifyId = 0;
var cleanId = 0;
async function counter(guild) {
    if (guild.channels.cache.find(async x => x.name.startsWith('유저 수 | Users'))) {
        await guild.channels.cache.find(async x => x.name.startsWith('유저 수 | Users')).delete();
    }
    if (guild.channels.cache.find(async x => x.name.startsWith('전체 유저 수 | All Members'))) {
        await guild.channels.cache.find(async x => x.name.startsWith('전체 유저 수 | All Members')).delete();
    }
    if (guild.channels.cache.find(async x => x.name.startsWith('봇 수 | Bots'))) {
        await guild.channels.cache.find(async x => x.name.startsWith('봇 수 | Bots')).delete();
    }
    if (guild.channels.cache.find(async x => x.name === 'UCR 유저 현황 | UCR User Status')) {
        await guild.channels.cache.find(async x => x.name === 'UCR 유저 현황 | UCR User Status').delete();
    }
    await guild.channels.create('UCR 유저 현황 | UCR User Status', {
        type: 'category'
    }).then(async c => {
        await guild.channels.create('전체 유저 수 | All Members:' + guild.memberCount, {
            type: "voice",
            parent: c.id
        });
        var user = 0;
        await guild.members.cache.forEach(async x => {
            if (!x.user.bot) {
                user++
            }
        });
        await guild.channels.create('유저 수 | Users:' + user, {
            type: "voice",
            parent: c.id
        });
        var bot = 0;
        await guild.members.cache.forEach(async x => {
            if (x.user.bot) {
                bot++
            }
        });
        await guild.channels.create('봇 수 | Bots:' + bot, {
            type: "voice",
            parent: c.id
        });
    });
}
async function type(text) {
    if (text.toLowerCase().startsWith("promise")) {
        if (typeof text === "Promise { <pending> }") {
            return "promise 실행 중";
        } else if (typeof text === "Promise { <fulfilled> }") {
            return "promise 실행 성공";
        } else if (typeof text === "Promise { <rejected> }") {
            return "promise 실행 실패";
        } else {
            return "promise";
        }
    } else if (typeof text.toLowerCase() === "string") {
        return "문자열";
    } else if (typeof text.toLowerCase() === "number") {
        return "숫자";
    } else if (typeof text.toLowerCase() === "object") {
        return "객체";
    } else if (typeof text.toLowerCase() === "array") {
        return "배열";
    } else if (
        typeof text.toLowerCase() === "undefined" ||
        typeof text.toLowerCase() === null
    ) {
        return "NULL(값이 없음)";
    } else {
        return text;
    }
}
client.on('ready', async () => {
    await console.log(`${client.user.tag}로 로그인됨`);
    if (!client.guilds.cache.get('632536162770354186')) return;
    await client.user.setPresence({
        status: "online",
        activities: {
            name: '관리',
            type: "PLAYING"
        },
        shardID: 0
    });
    const embed = new Discord.MessageEmbed()
        .setTitle('UCR 역할 받기 | UCR get-roles')
        .setThumbnail('https://cdn.discordapp.com/icons/632536162770354186/a_1f326648cc72d4c84985ac3f7dd68a61.jpg')
        .setDescription('1️⃣: 슷칼봇을 한다(SkileBot)\n2️⃣: 배추봇, 마이펫을 한다(Cabbage Bot & My Pet)\n3️⃣: 엔트리를 한다(Entry)\n4️⃣: 스크래치를 한다(Scratch)\n5️⃣: 디스코드 봇 프로그래밍을 한다(Discord bot programming)\n6️⃣: 구독자(Subscribers)\n')
        .setColor(0x00ffff)
        .setFooter('UCR(User Communication Room)', client.guilds.cache.get('632536162770354186').iconURL({
            dynamic: true
        }))
        .setTimestamp()
    const imbed = new Discord.MessageEmbed()
        .setTitle('규칙 | Rule')
        .setThumbnail('https://cdn.discordapp.com/icons/632536162770354186/a_1f326648cc72d4c84985ac3f7dd68a61.jpg')
        .setDescription('환영합니다!\n본 서버는 그냥 자유롭게 아무 애기나 하셔도 되구요,\n2가지 규칙만 지키시면 됩니다.\n1.욕 금지\n2.기본 매너 지키기\n이것만 지키심 되구, 모든 서버는 자유롭게 이용하실수 있습니다\n따로 궁금하거나 뭘 만들어 달라는 제보는 관리자 한테 해주세요\n감사합니다\n이 모든 것을 동의하면 이 아래에 있는 ✅ 를 눌러주세요!\n\n\nWelcome!\nIn this server you can talk anything about it,\nbut you have to obey just 2 rules!\n1.No cursing\n2.Keep basic manners\nIf you obey this rules than you can chat in this room freely!\nIf you have a questions or what to suggest send a DM to the admin\nThank you!\nIf you agree all this, please react with ✅ to verify!')
        .setColor(0x00ffff)
        .setFooter("UCR(User Community Room)", client.guilds.get('632536162770354186').iconURL({
            dynamic: true
        }))
        .setTimestamp()
    await client.channels.cache.get('657379262348787713').bulkDelete(2);
    await client.channels.cache.get('657379262348787713').send(embed).then(async m => {
        messageId = m.id;
        await m.react('1️⃣');
        await m.react('2️⃣');
        await m.react('3️⃣');
        await m.react('4️⃣');
        await m.react('5️⃣');
        await m.react('6️⃣');
    });
    
    await client.channels.cache.get('657379262348787713').send(imbed).then(async x => {
        verifyId = x.id;
    });
    await setInterval(async () => {
        /*
        random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
            await client.user.setPresence({
                status: "online",
                activities: {
                    name: '관리',
                    type: "PLAYING"
                }
            });
        }
        else {
            await client.user.setPresence({
                status: "online",
                activities: {
                    name: `${client.guilds.cache.get('675317307198668840').memberCount}명의 멤버`,
                    type: "WATCHING"
                }
            });
        }
        */
    }, 10000);
});
client.on('messageReactionAdd', async (react, user) => {
    if (!client.guilds.cache.get('632536162770354186')) return;
    if (user.bot) return;
    if (react.message.channel.id != '657379262348787713') {
        if (react.emoji.name === '1️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('슷칼봇')));
        } else if (react.emoji.name === '2️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('배추봇')));
        } else if (react.emoji.name === '3️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('엔트리')));
        } else if (react.emoji.name === '4️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('스크래치')));
        } else if (react.emoji.name === '5️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('봇 마스터')));
        } else if (react.emoji.name === '6️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('구독자')));
        }
    } else if (react.message.id == verifyId) {
        if (react.emoji.name === '✅') {
            await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(async r => r.name.startsWith('멤버')));
        }
    }
});
client.on('messageReactionRemove', async (react, user) => {
    if (!client.guilds.cache.get('632536162770354186')) return;
    if (user.bot) return;
    if (react.message.channel.id != '657379262348787713') {
        if (react.emoji.name === '1️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('슷칼봇')));
        } else if (react.emoji.name === '2️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('배추봇')));
        } else if (react.emoji.name === '3️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('엔트리')));
        } else if (react.emoji.name === '4️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('스크래치')));
        } else if (react.emoji.name === '5️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('봇 마스터')));
        } else if (react.emoji.name === '6️⃣') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('구독자')));
        }
    } else if (react.message.id == verifyId) {
        if (react.emoji.name === '✅') {
            await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(async r => r.name.startsWith('멤버')));
        }
    }
});
client.on('message', async message => {
    if (message.channel.type != 'text') return;
    if (message.author.bot) return;
    if (!message.content.startsWith('u!')) return;
    //await message.channel.startTyping(1);
    const args = message.content.substr(2);
    if (args.startsWith('ban')) {
        const arg2 = args.split('$');
        if (arg2.length != 3) return message.cahnnel.send('차단 메세지는 u!ban$<차단할 멤버 멘션>$<차단 이유> 형식이어야 합니다.\nBanning messages\' format should be u!ban$<mention the user you want to ban>$<reason for banning>.');
        const mention = message.mentions.users.first();
        if (!mention) return message.channel.send('차단할 유저를 멘션해주세요\nPlease mention who do you want to ban.');
        const member = message.guild.member(mention);
        if (!member) return message.channel.send('유효하지 않은 멤버입니다.\nYou mentioned an invaild member.');
        await member.ban({
            reason: arg2[2]
        }).then(async x => {
            await message.cahnnel.send(x.tag + '을/를 차단했습니다.\nSuccessfully banned ' + x.tag + '.');
        });
    }
    else if (args.startsWith('kick')) {
        const arg2 = args.split('$');
        if (arg2.length != 3) return message.cahnnel.send('추방 메세지는 u!ban$<추방할 멤버 멘션>$<추방 이유> 형식이어야 합니다.\nKicking messages\' format should be u!kick$<mention the user you want to kick>$<reason for kicking>.');
        const mention = message.mentions.users.first();
        if (!mention) return message.channel.send('추방할 유저를 멘션해주세요\nPlease mention who do you want to kick.');
        const member = message.guild.member(mention);
        if (!member) return message.channel.send('유효하지 않은 멤버입니다.\nYou mentioned an invaild member.');
        await member.ban({
            reason: arg2[2]
        }).then(async x => {
            await message.cahnnel.send(x.tag + '을/를 추방했습니다.\nSuccessfully kicked ' + x.tag + '.');
        });
    }
    else if (args === 'counter') {
        counter(message.guild);
    }
    else if (args.startsWith('eval ')) {
        const arg = message.content.split(" ").slice(1);
        if (message.author.id != '647736678815105037') return;
        const imbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} Evaling...`)
            .addField("입력", "```js\n" + args.substr(5) + "\n```")
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp();
        const m = await message.channel.send(imbed);
        try {
            const code = arg.join(" ");
            let evaled = eval(code);
            console.log(evaled);
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            if (evaled.length >= 1020) evaled = `${evaled.substr(0, 1010)}...`;
            await console.log(evaled);
            const embed = new Discord.MessageEmbed()
                .setTitle("eval 결과")
                .setDescription(
                    "~~이건 제가 ditto7890#8948님 도움 없이 혼자서 만든 코드입니다.~~"
                )
                .addField(
                    "입력 코드",
                    "```js\n" + message.content.substr(7) + "\n```"
                )
                .addField("결과", "```js\n" + evaled + "\n```")
                .addField("결과 자료형", "```js\n" + type(evaled) + "\n```")
                .setColor(0x00ff00)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            await m.edit(embed);
        } catch (err) {
            if (message.channel.type != "text") return;
            const embed = new Discord.MessageEmbed()
                .setTitle("에러 | Error")
                .addField("에러 내용", err)
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/665169857972797440/670904480388218900/unknown.png"
                );
            const embed2 = new Discord.MessageEmbed()
                .setTitle("eval 오류")
                .setDescription(
                    "~~이건 제가 ditto7890#8948님 도움 없이 혼자서 만든 코드입니다.~~"
                )
                .addField(
                    "입력 코드",
                    "```js\n" + message.content.substr(7) + "\n```"
                )
                .addField("오류 내용", "```js\n" + err + "\n```")
                .setColor(0xff0000)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            m.edit(embed2);
        }
    }
    else if (args.startsWith('mute')) {
        const muteuser = message.mentions.users.first();
        if (!muteuser) return await message.channel.send('뮤트할 유저를 멘션해주세요.\nPlease mention who do you want to ban.');
        const mutemember = message.guild.members.cache.get(muteuser.id);
        if (!mutemember) return await message.channel.send('유효하지 않은 멤버입니다.\nYou mentioned an invaild member.');
        const splited = args.split('$');
        if (splited.length != 3) return await message.cahnnel.send('뮤트 메세지는 u!mute$<유저 멘션>$<뮤트 이유>의 형식이어야 합니다.\nMuting messages\' format should be u!mute$<mention who do you want to mute>$<reason for muting>.');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | Muting`)
            .setColor(0xffff00)
            .addField('뮤트할 유저 | User to mute', muteuser.tag)
            .addField('진행 상황 | Status', '유저의 모든 역할을 지우는 중 | Deleting all roles from the user')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let progress = await message.channel.send(embed);
        mutemember.roles.cache.forEach(async x => {
            const imbed = new Discord.MessageEmbed()
                .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | Muting`)
                .setColor(0xffff00)
                .addField('뮤트할 유저 | User to mute', muteuser.tag)
                .addField('진행 상황 | Status', `유저의 역할 ${x.name}을/를 지우는 중 | Deleting role ${x.name} from the user`)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            await progress.edit(imbed);
            await mutemember.roles.remove(x.id);
        });
        const ymbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | muting`)
            .setColor(0xffff00)
            .addField('뮤트할 유저 | User to mute', muteuser.tag)
            .addField('진행 상황 | Status', `유저에게 역할 ${message.guild.roles.cache.find(r => r.name.startsWith('뮤트')).name} 을/를 추가하는 중 | Adding role ${message.guild.roles.cache.find(r => r.name.startsWith('뮤트')).name} to the user`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await progress.edit(ymbed);
        if (!message.guild.roles.cache.find(r => r.name.startsWith('뮤트'))) {
            message.guild.roles.create('뮤트 | Muted').then(async x => {
                await x.setPermissions(0);
            });
            message.guild.channels.cache.forEach(async x => {
                x.createOverwrite(message.guild.roles.cache.find(async x => x.name.startsWith('뮤트')), {
                    VIEW_CHANNELS: false
                });
            });
        }
        await mutemember.roles.add(message.guild.roles.cache.find(async x => x.name.startsWith('뮤트')).id);
        const eembed = new Discord.MessageEmbed()
            .setTitle('뮤트 완료! | Muting completed!')
            .addField('뮤트된 유저 | Muted user', muteuser.tag)
            .addField('뮤트 이유 | Reason for muting', splited[2])
            .setColor(0x00ff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await progress.edit(eembed);
    }
    else if (args.startsWith('delete')) {
        var splyt = args.split('$');
        if (splyt.length != 2 || splyt[1] % 1 != 0) return await message.channel.send('삭제 명령어는 u!delete$<삭제할 메세지 개수> 형식이어야 합니다.\nDeleting messages\' format should be u!delete$<how many messages do you want to delete>.');
        await message.channel.bulkDelete(splyt[1]).then(async x => {
            await message.channel.send(`${splyt[1]}개의 메세지를 삭제하였습니다.`);
        })
    }
    else if (args.startsWith('warn')) {
        const arg3 = args.split('$');
        if (arg3.length != 3) return await message.channel.send('경고 메세지는 형식이 u!warn$<경고할 유저 멘션>$<경고 사유> 여아 합니다.\nWarning message\'s format should be u!warn$<mention the user to warn>$<reason for warning>.');
        const mention = message.mentions.users.first();
        if (!mention) return await message.channel.send('경고할 유저를 멘션해주세요\nPlease mention who do you want to warn.');
        const member = message.guild.member(mention);
        if (!member) return await message.channel.send('유효하지 않은 멤버입니다.\nYou mentioned an invaild member.');
        if (!message.guild.channels.cache.find(x => x.name.indexOf('경고') != -1)) {
            await message.guild.channels.create('경고');
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('경고 | Warn')
            .setColor(0xff0000)
            .addField('경고된 유저 | The user who was warned', `${message.mentions.users.first()}`)
            .addField('경고 사유 | Reason for warning', arg3[2])
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: "true"
            }))
            .setTimestamp()
        await message.guild.channels.cache.find(x => x.name.indexOf('경고') != -1).send(embed);
        await message.channel.send('경고 메세지가 발송되었습니다.\nWarn message had successfully sent');
    }
    else if (args === 'ping') {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 핑 측정 중 | Pinging`)
            .setColor(0xffff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        const embed2 = new Discord.MessageEmbed()
            .setTitle('퐁! | PONG!')
            .setColor(0x00ff00)
            .setThumbnail('https://i.imgur.com/1Gk4tOj.png')
            .addField('API 지연 시간 | API Latency', client.ws.ping)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await m.edit(embed2);
    }
    else if (args === 'clean') {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 삭제 중 | Deleting`)
            .setColor(0xffff00)
            .setDescription(`${message.channel.name} 채널에 있는 모든 메세지를 삭제 중입니다. 이 작업은 시간이 오래 걸릴 수 있습니다. | Deleting all messages from ${message.channel.name}. This may take some time.`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await message.author.send(embed).then(x => {
            cleanId = x.id;
        });
        for (var i = 0; i < 100; i++) {
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100, true)
        }
        const imbed = new Discord.MessageEmbed()
            .setTitle(`삭제 완료 | Deleted`)
            .setColor(0x00ff00)
            .setDescription(`${message.channel.name} 채널에 있는 모든 메세지를 삭제했습니다. | Deleted all messages from ${message.channel.name}.`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await message.author.dmChannel.messages.cache.get(cleanId).edit(imbed);
    }
    //await message.channel.stopTyping(true);
});
client.on('guildMemberAdd', async member => {
    await member.client.guilds.cache.get('632536162770354186').channels.cache.find(x => x.name.indexOf('인사') != 0).send(`${member} 님이 ${member.guild.name}에 오셨습니다.\n${member} just joined ${member.guild.name}.`);
    await counter(member.client.guilds.cache.get('632536162770354186'));
});
client.on('guildMemberRemove', async member => {
    await member.client.guilds.cache.get('632536162770354186').channels.cache.find(x => x.name.indexOf('인사') != 0).send(`${member.tag} 님이 ${member.guild.name}을/를 나갔습니다.\n${member.user.tag} just left ${member.guild.name}.`);
    await counter(member.client.guilds.cache.get('632536162770354186'));
});
client.login(process.env.TOKEN);