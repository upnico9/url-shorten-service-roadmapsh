export default function getError(error) {
    const code = error.code || 500;
    const message = error.message || "Internal Server Error";
    return { code, message };
}