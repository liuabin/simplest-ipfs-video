//// This is a function to simplify the js
//// Need: Ipfs node init
function genIpfsVideo(ipfsnode, hash, element) {
    let stream
    let vs = new videostream({
        createReadStream: function createReadStream(opts) {
            const { start, end } = opts
            stream = ipfsnode.catReadableStream(hash, {
                offset: start,
                length: end && end - start
            })
            stream.on('error', (err)=>{ console.log(err) })
            return stream
        }
    }, element)

    return vs
}