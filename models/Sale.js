const fs = require('fs');
const path = require('path');
const Sale = require("../schema/Sale");

const addNewSale = async ({ saleName, price, count }) => {
    if (saleName == undefined || price === undefined || count === undefined) {

        return false;
    }



    try {


        const newSale = new Sale({
            saleName,
            price,
            count
        });

        const res = await newSale.save();




        return res
    } catch (err) {
        console.error('error', err);
        return false;
    }
};

const deleteSale = async ({ saleIdToDelete }) => {
    if (!saleIdToDelete) {
        return false;
    }

    try {
        const saleToDelete = await Sale.findById(saleIdToDelete);

        if (!saleToDelete) {
            console.log('Sale not found.');
            return false;
        }

        const deletedSale = await Sale.deleteOne({ _id: saleIdToDelete });

        if (deletedSale.deletedCount <= 0) {
          
            console.log('sale not deleted.');
            return false;
        }
    } catch (e) {
        console.log('Error while deleting a sale from the database', e);
        return false;
    }

    return true;
};

async function updateSale({ saleId, saleName = null,  price = null, count = null }) {
    try {
        let updateObject = {};
        if (saleName !== null) {
            updateObject.saleName = saleName;
        }
        if (price !== null) {
            updateObject.price = price;
        }
        if (count !== null) {
            updateObject.count = count;
        }
        const updatedSale = await Sale.findByIdAndUpdate(saleId, { $set: updateObject }, { new: true });
        return updatedSale;
    } catch (error) {
        console.log('Error while updating sale on the database', error);
        return false;
    }
}
const getSales = async () => {

    let sales;
    try {
        sales = await Sale.find();

    } catch (e) {
        console.log('error while grabing Sales from the  database', e)
        return false;
    }
    return sales;

}
const getSale = async (saleId) => {
    let sale;
    try {
        sale = await Sale.findById(saleId);

    } catch (e) {
        console.log('error while finding the sale on the database', e)
        return false;
    }
    return sale;

}
module.exports = {
    deleteSale,
    addNewSale,
    updateSale,
    getSale,
    getSales
}