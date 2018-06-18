export function isMatch (full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1 ? true : false;
}