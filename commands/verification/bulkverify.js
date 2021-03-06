const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bulkverify",
    description: "Bulk verify all members in guild",
    category: "Verification",
    usage: "(command) (human/all)",
    perms: "ADMINISTRATOR",
    async execute(client, message, args, settings) {
        if ((!args.length) || args[0] !== "human" || args[0] !== "all") {
            let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("User input required")
            .setDescription(`Usage: ${this.usage}`);
            return message.channel.send(embed);
        } 
        const role = message.guild.roles.cache.get(settings.GiveRole);
        if (!role) {
            let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription("No role found for bulk verification");
            return message.channel.send(embed);
        }

        let embed = new MessageEmbed()
        .setColor("#1ef000")
        .setDescription("Verifying members. This may take a while")
        await  message.channel.send(embed);

        if (args[0] === "human") {
            await message.guild.members.cache.filter(m => !m.user.bot).forEach(async member => {
                await member.roles.add(role, "Bulk Verification");
            });
        } else if (args[0] === "all") {
            await message.guild.members.cache.forEach(async member => {
                await member.roles.add(role, "Bulk Verification");
            });
        }

        embed.setDescription("All members are successfully verified");
        return message.channel.send(embed);
    }
};