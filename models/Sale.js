const fs = require('fs');
const path = require('path');
const Sale = require("../schema/Sale");
const addNewSale = async ({ saleName, price, count,buyPrice,createdAt }) => {


    console.log('created AT', createdAt)
    if (saleName === undefined || price === undefined || count === undefined || buyPrice===undefined||createdAt===undefined||
        saleName === null || price === null || count === null || !buyPrice === null || createdAt ===null
        ) {
        return false;   
    }
console.log(createdAt)
    try {
        // Ensure count is a number
        const countAsNumber = parseInt(count, 10); // base 10

        if (isNaN(countAsNumber)) {
            console.error('Invalid count provided.');
            return false;
        }

        // Check if a sale with the given saleName and price already exists
        const existingSale = await Sale.findOne({ saleName, price, buyPrice,createdAt });

        if (existingSale) {
            // Sale already exists, update the count
            existingSale.count = existingSale.count + countAsNumber;
            const updatedSale = await existingSale.save();
            return updatedSale;
        } else {
            const newSale = new Sale({
                buyPrice,
                saleName,
                price,
                count: countAsNumber, // Use the parsed count
            });

            const res = await newSale.save();
            return res;
        }
    } catch (err) {
        console.error('Error', err);
        return false;
    }
};
const deleteSales = async ({ salesToDelete }) => {
    if (!salesToDelete || salesToDelete?.length === 0) {
        return false;
    }

    try {
        // Use $in operator to find and delete multiple sales
        const deletedSales = await Sale.deleteMany({ _id: { $in: salesToDelete } });

        if (deletedSales.deletedCount <= 0) {
            console.log('No sales deleted.');
            return false;
        }
    } catch (e) {
        console.log('Error while deleting sales from the database', e);
        return false;
    }

    return true;
};


async function updateSale({ saleId, saleName = null, price = null, count = null, buyPrice=null }) {
    try {
        let updateObject = {};
        if (saleName !== null) {
            updateObject.saleName = saleName;
        }
        if (buyPrice !== null) {
            updateObject.buyPrice = buyPrice;
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
    deleteSales,
    addNewSale,
    updateSale,
    getSale,
    getSales
}