const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const PREFIX = '!'; // Command prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check for the ticket command
    if (message.content.startsWith(`${PREFIX}ticket`)) {
        const ticketChannel = await message.guild.channels.create(`ticket-${message.author.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'], // Hide the channel from everyone
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'], // Allow the user to view the channel
                },
            ],
        });

        ticketChannel.send(`Hello ${message.author}, how can we assist you?`);
    }

    // Check for the close command
    if (message.content.startsWith(`${PREFIX}close`)) {
        if (message.channel.name.startsWith('ticket-')) {
            message.channel.delete();
        } else {
            message.reply('This is not a ticket channel!');
        }
    }
});

client.login(MTM2NzQ1MDMzMzY4NDY5NTEwMA.Ge45is.ml1muz9eiV3UPg0UfFJp8Dowi4sHyzHYtJgX6c);
