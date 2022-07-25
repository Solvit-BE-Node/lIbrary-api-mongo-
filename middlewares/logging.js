
function logger(req,res,next){
    console.log({
        Ip: req.ip,
        HostName: req.hostname,
        Method: req.method,
        Path: req.path,
        Protocol: req.protocol
    });
    next();
}

module.exports = logger;