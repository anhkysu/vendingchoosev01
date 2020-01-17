module.exports = function (constraint, data, hehe) {

    return new Promise((res, rej) => {
        if(constraint == undefined) {
            res("valid");
        }

        switch (constraint.type) {

            case "number":
                try {
                    for (var i = 0; i < data.length; i++) {
                        var yeah = parseInt(data.charAt(i)) ;
                        if(isNaN(yeah)){
                            res("invalid");
                        }
                    }
           
                    myNumber = parseInt(data);
                    if (myNumber <= constraint.maxValue && myNumber >= constraint.minValue) {
                        res("valid")
                    }
                    else {
                        res("invalid")
                    }
                }
                catch{
                    e => {
                        res("invalid")
                    }
                };
                break;

            case "text":
                try {
                    if (typeof(data) == "string" && data.length <= constraint.maxLength) {
                        res("valid")
                    }
                    else {
                        res("invalid")
                    }
                }
                catch{
                    e => {
                        res("invalid")
                    }
                };
                break;
            
            default:
                res("invalid");
                break;
        }
    })

}