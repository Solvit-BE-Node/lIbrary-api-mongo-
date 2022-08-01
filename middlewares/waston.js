const {createLoger, transports, format} = require('waston')

const customerLogger = createLoger({
    transports:[
        new transports.file({
            filename:'customer.log',
            level:'info',
            format: format.combine(format.timestamp(),format.json())
        }),
    new transports.file({
        filename:'customer-error.log',
        level:'error',
        format: format.combine(format.timestamp(),format.json())
        })
    ]
})

module.exports = customerLogger

