module.exports = function(RED) {

    var lora_packet = require('lora-packet');
    var splice = require('buffer-splice');

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function loraPacketConverter(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            if(msg.payload.length>12){
                var bufferDevice = new Buffer(msg.payload.slice( 0, 11)).toString('hex');

                var bufferPayload = Buffer.from(splice(msg.payload, 0, 12)).toString('utf8');
                var json = JSON.parse(bufferPayload);
                if(json.rxpk !== undefined){
                    var packet = lora_packet.fromWire(new Buffer(json.rxpk[0].data, 'base64'));

                    var NwkSKey = new Buffer(config.nsw, 'hex');
                    if(lora_packet.verifyMIC(packet, NwkSKey)){
                        var AppSKey = new Buffer(config.asw, 'hex');
                        json.rxpk[0].data = lora_packet.decrypt(packet, AppSKey, NwkSKey).toString();
                        json.rxpk[0].device = bufferDevice;
                        msg.payload = json;
                        node.status({});
                        node.send(msg);

                    } else {
                        this.error("fail Network key for! Raw packet is " + packet );
                        node.send(null);
                    }
                } else {
                    node.send(null);
                }
            } else {
                node.send(null);
            }

        });

        node.on("close", function() {
        });
    }

    RED.nodes.registerType("lora-packet-converter", loraPacketConverter);
};