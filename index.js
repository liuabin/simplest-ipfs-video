// index.js
var vs
var stream // Use less
const player = document.getElementById('video')
var number = 0
const count = document.getElementById('number')
const ipfs = new Ipfs({
  repo: 'ipfs',
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
            ]
        }
    }  
})

const createVideo = () => {
    // let stream
    vs = new videostream({
        createReadStream: function createReadStream(opts) {
            // const start = opts.start
            // const end = opts.end ? start + opts.end + 1 : undefined
            const {start,end} = opts
            if (stream && stream.destroy) {
                stream.destroy()
            }
            //// IPFS Create blob File ////
            stream = ipfs.catReadableStream('QmcAmXANyKjCfRoy9HAHA2tK4c3ujHH2yekwZwNTD6gTDh', {
                offset: start,
                length: end && end - start
            })
            stream.on('error', (err) => { console.log(err) })
            return stream
        }
    }, player)

    //// Print number of nodes ////
    setInterval(() => {
        ipfs.swarm.peers((_err,info)=>{ number = info.length })
        count.innerHTML = number
    }, 3000);
}

ipfs.on('ready', createVideo)
