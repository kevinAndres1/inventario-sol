
module.exports = async function(Model, data) {
    try {
        for (let i = 0; i < data.length; i++) {
            await Model.findOrCreate({
                where: data[i]
            });
        }
        
    } catch (error) {
        console.log(error);
    }
    
};
