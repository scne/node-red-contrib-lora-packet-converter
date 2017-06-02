module.exports = function(RED) {

    var lora_packet = require('lora-packet');
    var splice = require('buffer-splice');

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function createPacket(json, measure, cb) {
        var result = {};
        result.timestamp = json.rxpk[0].tmst;
        result.frequency = json.rxpk[0].freq;
        result.datarate = json.rxpk[0].datr;
        result.codr = json.rxpk[0].codr;
        result.snr = json.rxpk[0].lsnr;
        result.rssi = json.rxpk[0].rssi;
        cb(null, result);
    }

    function loraPacketConverter(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            if(msg.payload.length>12){
                var buf = new Buffer(splice(msg.payload, 0, 12)).toString('utf8');
                var json = JSON.parse(buf);
                var packet = lora_packet.fromWire(new Buffer(json.rxpk[0].data, 'base64'));

                var NwkSKey = new Buffer(config.nsw, 'hex');
                if(lora_packet.verifyMIC(packet, NwkSKey)){
                    var AppSKey = new Buffer(config.asw, 'hex');
                    var decrypt = lora_packet.decrypt(packet, AppSKey, NwkSKey).toString();
                    json.rxpk[0].data = decrypt;
                    msg.payload = json;
                    node.status({});
                    node.send(msg);

                }else {
                    node.error("hit an error", "fail Network key for "+msg);
                    return;
                }
            }

        });

        node.on("close", function() {
        });
    }

    RED.nodes.registerType("lora-packet-converter", loraPacketConverter);
};