import fastify from "fastify";
import router from "./router/url.js";
import dotenv from "dotenv";
import mongoClient from "./database/mongodb.js";

dotenv.config();

const app = fastify({ logger: true });

app.register(router);


app.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on ${address}`);
});
