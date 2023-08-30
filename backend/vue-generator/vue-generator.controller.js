const service = require('./vue-generator.service');

const generateComponent = async function (req, res, next) {
    const result = await service.generateComponent({ ...req.body });
    return res.send(result);
};

module.exports = {
    generateComponent,
};
