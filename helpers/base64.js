module.exports = {
    base64_encode = (file) => {
        // read binary data
        var bitmap = fs.readFileSync(file)
        // convert binary data to base64 encoded string
        console.log('hehehe')
        return new Buffer(bitmap).toString('base64')
    }
}   