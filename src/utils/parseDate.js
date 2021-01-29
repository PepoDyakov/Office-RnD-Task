export default function parseDate(date) {
    let dateTime = new Date(date);

    return dateTime.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
