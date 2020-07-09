const CompoundSubscriptionsProxy = artifacts.require("./CompoundSubscriptionsProxy.sol");
const CompoundSubscriptions = artifacts.require("./CompoundSubscriptions.sol");
const CompoundMonitor = artifacts.require("./CompoundMonitor.sol");
const CompoundMonitorProxy = artifacts.require("./CompoundMonitorProxy.sol");

require('dotenv').config();

module.exports = function(deployer, network, accounts) {
    let deployAgain = (process.env.DEPLOY_AGAIN === 'true') ? true : false;

    const compoundFlashLoanTakerAddress = '0x702Ff0d81Bb3333D90B60cC3d317B897390eB23a';
    const changePeriod = 0;

    deployer.then(async () => {
    	const compoundMonitorProxyAddress = '0xB1cF8DE8e791E4Ed1Bd86c03E2fc1f14389Cb10a'; //(await CompoundMonitorProxy.deployed()).address;
    	const subscriptionsAddress = '0x52015EFFD577E08f498a0CCc11905925D58D6207'; //(await CompoundSubscriptions.deployed()).address;

        // await deployer.deploy(CompoundMonitor, compoundMonitorProxyAddress, subscriptionsAddress, compoundFlashLoanTakerAddress, {gas: 4000000, overwrite: deployAgain});
    	const compoundMonitorAddress = '0x90574634C09a4A4E6e2B7Ce2BbecE1A609751048'; //(await CompoundMonitor.deployed()).address;

        console.log('adding caller');
        const monitor = await CompoundMonitor.at(compoundMonitorAddress);
        await monitor.addCaller('0x776B4a13093e30B05781F97F6A4565B6aa8BE330');

        console.log('changing monitor');
    	const compoundMonitorProxy = await CompoundMonitorProxy.at(compoundMonitorProxyAddress);
    	await compoundMonitorProxy.changeMonitor(compoundMonitorAddress);
        
        console.log('confirming new monitor');
        await compoundMonitorProxy.confirmNewMonitor();
    });
};

