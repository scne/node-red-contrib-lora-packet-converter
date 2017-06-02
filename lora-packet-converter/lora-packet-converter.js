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
            var buf = new Buffer(splice(msg.payload, 0, 12)).toString('utf8');
            var json = JSON.parse(buf);
            if(json.rxpk !== undefined){
                var packet = lora_packet.fromWire(new Buffer(json.rxpk[0].data, 'base64'));

                var NwkSKey = new Buffer(config.nsw, 'hex');
                if(lora_packet.verifyMIC(packet, NwkSKey)){
                    var AppSKey = new Buffer(config.asw, 'hex');
                    var decrypt = lora_packet.decrypt(packet, AppSKey, NwkSKey).toString();
                    json.rxpk[0].data = decrypt;
                    msg.payload = json;
                    node.status({});
                    node.send(msg);

                } else {
                    node.error("hit an error", "fail Network key for "+msg);
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