function ip_status(part1, part2){
    if(part1 == 10 && part2 >= 0 && part2 <= 255){
        return "Class A Private";
    } else if(part1 == 172 && part2 >= 16 && part2 <= 31){
        return "Class B Private";
    } else if(part1 == 192 && part2 >= 168 && part2 <= 168){
        return "Class C Private";
    } else {
        return "Public";
    }
}

function add_padding(octet){
    var zeros = "";
    if(octet.length < 8){
        for(var i = 0; i < (8 - octet.length); i++){
            zeros += "0";
        }
        octet = zeros + octet;
    }
    return octet;
}

function subnet_zeros(subnetMask){
    var rawSubnet = "11111111111111111111111111111111";
    var zeros = "";

    var sm1 = rawSubnet.substring(0, subnetMask);

    if(sm1.length < 32){
        for(var i = 0; i < (32 - sm1.length); i++){
            zeros += "0";
        }
        sm1 = sm1 + zeros;
    }
    console.log(sm1);
    return sm1;
}

function calculate_hosts(subnetMask){
    bits = 32 - subnetMask;
    hosts = 2 ** bits;

    return hosts - 2;
}

function calculate(){
    var zeros4 = "";
    var ones = "";

    var p1 = document.getElementById("part1").value;
    var p2 = document.getElementById("part2").value;
    var p3 = document.getElementById("part3").value;
    var p4 = document.getElementById("part4").value;
    var p5 = document.getElementById("subnetpart").value;

    if(p1 > 255 || p2 > 255 || p3 > 255 || p4 > 255 || p5 > 32){
        alert("Input error.\n\nAll octets of an IPv4 must be less than or equal to 255.\nThe maximum possible subnet mask is 32.");
    } else if(p1 == "" || p2 == "" || p3 == "" || p4 == "" || p5 == ""){
        alert("Input error.\n\nOne or more inputs are null.")
    } else if(isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(p4) || isNaN(p5)){
        alert("Input error.\n\nThe input must be a number.")
    } else {
        var int1 = parseInt(p1);
        var int2 = parseInt(p2);
        var int3 = parseInt(p3);
        var int4 = parseInt(p4);
        var subnet = parseInt(p5);
    
        var b1 = int1.toString(2);
        var b2 = int2.toString(2);
        var b3 = int3.toString(2);
        var b4 = int4.toString(2);
    
        console.log(int1);
    
        var b1 = add_padding(b1);
        var b2 = add_padding(b2);
        var b3 = add_padding(b3);
        var b4 = add_padding(b4);
    
        var unprocessedbin = b1 + "." + b2 + "." + b3 + "." + b4;
        document.getElementById("unprocessed-binary").innerHTML = "Before subnet mask: " + unprocessedbin.fontcolor("lightseagreen");
    
        var joinedbin = b1 + b2 + b3 + b4;
        var aftersubnet = joinedbin.substring(0, subnet);
    
        if(aftersubnet.length < 32){
            for(var i = 0; i < (32 - aftersubnet.length); i++){
                zeros4 += "0";
                ones += "1";
            }
            networksubnet = aftersubnet + zeros4;
            broadcastsubnet = aftersubnet + ones;
        }
    
        console.log(networksubnet);
    
        var binSubnetMask = subnet_zeros(subnet);
        console.log(binSubnetMask);
    
        var as1 = networksubnet.substring(0, 8);
        var as2 = networksubnet.substring(8, 16);
        var as3 = networksubnet.substring(16, 24);
        var as4 = networksubnet.substring(24, 32);
        var fu1 = as4.slice(0, -1) + "1";
    
        var bc1 = broadcastsubnet.substring(0, 8);
        var bc2 = broadcastsubnet.substring(8, 16);
        var bc3 = broadcastsubnet.substring(16, 24);
        var bc4 = broadcastsubnet.substring(24, 32);
        var lu1 = bc4.slice(0, -1) + "0";
    
        var sm1 = binSubnetMask.substring(0, 8);
        var sm2 = binSubnetMask.substring(8, 16);
        var sm3 = binSubnetMask.substring(16, 24);
        var sm4 = binSubnetMask.substring(24, 32);
    
        console.log(parseInt(as1, 2));
    
        var aftersubnetbinary = as1 + "." + as2 + "." + as3 + "." + as4;
    
        document.getElementById("joined-binary").innerHTML = "After subnet mask: " + aftersubnetbinary.fontcolor("lightseagreen");
    
        var dec1 = parseInt(as1, 2);
        var dec2 = parseInt(as2, 2);
        var dec3 = parseInt(as3, 2);
        var dec4 = parseInt(as4, 2);
        var fudec = parseInt(fu1, 2);
    
        var bcdec1 = parseInt(bc1, 2);
        var bcdec2 = parseInt(bc2, 2);
        var bcdec3 = parseInt(bc3, 2);
        var bcdec4 = parseInt(bc4, 2);
        var ludec = parseInt(lu1, 2);
    
        var smdec1 = parseInt(sm1, 2);
        var smdec2 = parseInt(sm2, 2);
        var smdec3 = parseInt(sm3, 2);
        var smdec4 = parseInt(sm4, 2);
    
        var networkaddress = dec1 + "." + dec2 + "." + dec3 + "." + dec4;
        var firstusableaddress = dec1 + "." + dec2 + "." + dec3 + "." + fudec;
        var lastusableaddress = bcdec1 + "." + bcdec2 + "." + bcdec3 + "." + ludec;
        var broadcastaddress = bcdec1 + "." + bcdec2 + "." + bcdec3 + "." + bcdec4;
        var subnetmaskfull = smdec1 + "." + smdec2 + "." + smdec3 + "." + smdec4;

        var ipstatus = ip_status(int1, int2);
        console.log(int1, int2);

        document.getElementById("network-address").innerHTML = "Network address: " + networkaddress.fontcolor("lightskyblue");
        document.getElementById("firstusable-address").innerHTML = "First usable address: " + firstusableaddress.fontcolor("lightgreen");
        document.getElementById("lastusable-address").innerHTML = "Last usable address: " + lastusableaddress.fontcolor("lemonchiffon");
        document.getElementById("broadcast-address").innerHTML = "Broadcast address: " + broadcastaddress.fontcolor("lightcoral");
        document.getElementById("subnet-mask").innerHTML = "Subnet mask: " + subnetmaskfull.fontcolor("plum");
        document.getElementById("available-hosts").innerHTML = "Usable hosts: " + calculate_hosts(subnet);
        document.getElementById("result-section").style.visibility = "visible";
        document.getElementById("ip-status").innerHTML = "Public or private: " + ipstatus;
    }
}
