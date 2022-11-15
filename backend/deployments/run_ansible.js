const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {objToArgs} = require("../utils/utils");


const ansibleExecute = async (args = {})=>{
    const cmd = `ANSIBLE_LOCALHOST_WARNING=false ansible-playbook ./deployments/user-invite-into-gl-space.yaml --extra-vars "${objToArgs(args)}"`;
    const { stdout } = await exec(cmd);
    return stdout;

}
module.exports = {
    ansibleExecute
}
