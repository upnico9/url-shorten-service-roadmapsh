import Shorten from '../models/shorten.js';
import { v4 } from 'uuid';

export async function getShorten(request) {
    try {
        const urlId = request.params.urlId;

        checkUrlInput(urlId);

        const url = await Shorten.findOne({ short_url: urlId });

        if (!url) {
            throw { code : 404, message: "URL Not Found" };
        }

        url.visits += 1;
        await url.save();

        const { _id, ...urlData } = url.toObject();
        return urlData;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function postShorten(request) {
    try {
        console.log(request.body);
        const url = request.body.url;

        checkUrlInput(url);

        const shortUrl = generateShortUrl();

        const newUrl = new Shorten({
            original_url: url,
            short_url: shortUrl,
        });

        await newUrl.save();
        return newUrl;
    } catch (error) {
        throw error;
    }
}

export async function patchShorten(request) {
    try {

        console.log(request.params.urlId);
        console.log(request.body);
        const newUrl = request.body.newUrl;

        checkUrlInput(newUrl);

        const url = await Shorten.findOne({ short_url: request.params.urlId });
        if (!url) {
            throw { code : 404, message: "URL Not Found" };
        }

        url.original_url = newUrl;
        url.updated_at = Date.now();
        await url.save();

        return url;

    } catch (error) {
        throw error;
    }
}

export async function deleteShorten(request) {
    try {
        console.log(request.params.urlId);
        const urlId = request.params.urlId;

        checkUrlInput(urlId);

        const url = await Shorten.findOne({ short_url: urlId });
        if (!url) {
            throw { code : 404, message: "URL Not Found" };
        }

        await Shorten.deleteOne({ short_url : urlId });

        return true;
    } catch (error) {
        throw error;
    }
}

export async function getShortenStats(request) {
    try {
        const urlId = request.params.urlId;

        checkUrlInput(urlId);

        const url = await Shorten.findOne({ short_url: urlId }, { _id: 0, __v: 0 });
        if (!url) {
            throw { code : 404, message: "URL Not Found" };
        }

        return { created_at: url.created_at, visits: url.visits };
    } catch (error) {
        throw error;
    }
}


function checkUrlInput(url) {
    if (!url || url === "" || url === undefined || typeof url !== "string") {
        throw { code : 400, message: "Invalid URL" };
    }
    return true;
}

function generateShortUrl() {
    return v4().substring(0, 6);
}

