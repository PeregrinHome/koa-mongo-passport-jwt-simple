
const index = {};

index.get = async function(ctx, next) {
    ctx.body = 'service charts';
};

module.exports = {
    index
};

