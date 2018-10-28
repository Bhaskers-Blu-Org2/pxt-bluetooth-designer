function genUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function isUUID(uuid) {
    return /^[\da-f]{8,8}(-[\da-f]{4,4}){3,3}-[\da-f]{12,12}$/.test(uuid);
}    

$(function() {
    const input = $('#input');
    const output = $('#output');

    input.change(() => {
        const src = input.val();
        try {
            const json = JSON.parse(src);
            output.value(JSON.stringify(json, null, 2));
        } catch(e) {
            output.value(`invalid json`);
        }
    })
})