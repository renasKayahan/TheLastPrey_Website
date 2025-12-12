const { MongoClient } = require("mongodb");

const username = encodeURIComponent("renas1kayahan");
const uri = `mongodb+srv://${username}:TGSKZ6tjYdnQkmSe@thelastpreyserver.pvnrx.mongodb.net/theLastPreyServer?retryWrites=true&w=majority&appName=theLastPreyServer`;
const client = new MongoClient(uri);

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    const { username, password, email } = JSON.parse(event.body);

    if (!username || !password || !email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Please enter a username, password, and email." }),
        };
    }

    try {
        await client.connect();
        const db = client.db("theLastPreyServer");
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return {
                statusCode: 409,
                body: JSON.stringify({ error: "Username already exists." }),
            };
        }

        // Insert new user
        await usersCollection.insertOne({ username, password, email });
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "User registered successfully!" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        await client.close();
    }
};