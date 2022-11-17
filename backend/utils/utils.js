const objToArgs = (obj = {})=> {
    return Object.entries(obj).reduce((acc, [_key, _value])=> acc + ` ${_key}=${_value}`, "")
}

// others might be pagination sorting etc
const withStatusOk = (data, ...others)=> JSON.stringify({
    status: "OK",
    data,
    ...others
})

module.exports = {
    objToArgs,
    withStatusOk
}