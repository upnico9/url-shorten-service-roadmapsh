import { getShorten, postShorten, patchShorten, deleteShorten, getShortenStats } from "../controller/shorten.js";
import getError from "../utils/error.js";

export default function router(fastify, opts) {
    fastify.get("/shorten/:urlId", async (request, reply) => {
        try {
            const urlOject = await getShorten(request);
            reply.send(urlOject);
        } catch (error) {
            const errorResponse = getError(error);
            reply.code(errorResponse.code).send({ error: errorResponse.message });
        }
    });

    fastify.post("/shorten", async (request, reply) => {
        try {
            const urlObject = await postShorten(request);
            reply.code(201).send(urlObject);
        } catch (error) {
            const errorResponse = getError(error);
            reply.code(errorResponse.code).send({ error: errorResponse.message });
        }
    });

    fastify.put("/shorten/:urlId", async (request, reply) => {
        try {
            const urlObject = await patchShorten(request);
            reply.send(urlObject);
        } catch (error) {
            const errorResponse = getError(error);
            reply.code(errorResponse.code).send({ error: errorResponse.message });
        }
    });

    fastify.delete("/shorten/:urlId", async (request, reply) => {
        try {
            await deleteShorten(request);
            reply.code(204).send();
        } catch (error) {
            const errorResponse = getError(error);
            reply.code(errorResponse.code).send({ error: errorResponse.message });
        }
    });

    fastify.get("/shorten/:urlId/stats", async (request, reply) => {
        try {
            const statsObject = await getShortenStats(request);
            reply.send(statsObject);
        } catch (error) {
            const errorResponse = getError(error);
            reply.code(errorResponse.code).send({ error: errorResponse.message });
        }
    });

}