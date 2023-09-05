/**
 * Rating rules for the Receipt
 * @type {Object}
 * @memberof ReceiptModel
 */
const rules = {
    /**
     * 1st Rule: One point for every alphanumeric character in the retailer name
     * @param {Object} receiptData
     * @returns {Number} points
     */
    firstRule({ retailer }) {
        let points = 0;

        for (let i = 0; i < retailer.length; i ++) {
            const charCode = retailer.charCodeAt(i);

            const isAlpha = (
                (charCode >= 48 && charCode <= 57) || // Numeric
                (charCode >= 65 && charCode <= 90) || // Upper Alpha
                (charCode >= 97 && charCode <= 122) // Lower Alpha
            );

            if (isAlpha) points ++;
        }

        return points;
    },

    /**
     * 2nd Rule: 50 points if the total is a round dollar amount with no cents
     * @param {Object} receiptData
     * @returns {Number} points
     */
    secondRule({ total }) {
        const cents = total.split('.')[1];

        return cents === '00' ? 50 : 0;
    },
    
    /**
     * 3rd Rule: 25 points if the total is a multiple of 0.25
     * @param {Object} receiptData
     * @returns {Number} points
     */
    thirdRule({ total }) {
        const cents = parseInt(total.split('.')[1]);

        return cents % 25 === 0 ? 25 : 0;
    },
    
    /**
     * 4th Rule: 5 points for every two items on the receipt
     * @param {Object} receiptData
     * @returns {Number} points
     */
    fourthRule({ items }) {
        const points = Math.floor(items.length / 2) * 5;

        return points;
    },
    
    /**
     * 5th Rule: If the trimmed length of the item description is a multiple of 3,
     * multiply the price by 0.2 and round up to the nearest integer.
     * The result is the number of points earned
     * @param {Object} receiptData
     * @returns {Number} points
     */
    fifthRule({ items }) {
        const points = items.reduce((count, item) => {
            const { shortDescription } = item;
            const { length } = shortDescription.trim();

            if (length % 3 === 0) {
                const { price: priceStr } = item;
                const price = parseFloat(priceStr);
                
                return count + Math.ceil(price / 5);
            }

            return count;
        }, 0);

        return points;
    },
    
    /**
     * 6th Rule: 6 points if the day in the purchase date is odd
     * @param {Object} receiptData
     * @returns {Number} points
     */
    sixthRule({ purchaseDate }) {
        const day = parseInt(purchaseDate.split('-')[2]);
        const points = day % 2 === 1 ? 6 : 0;

        return points;
    },
    
    /**
     * 7th Rule: 10 points if the time of purchase is after 2:00pm and before 4:00pm
     * @param {Object} receiptData
     * @returns {Number} points
     */
    seventhRule({ purchaseTime }) {
        const militaryTime = parseInt(purchaseTime.replace(':', ''));

        const isInTimeSpan = militaryTime > 1400 && militaryTime < 1600;
        
        return isInTimeSpan ? 10 : 0;
    },
};

module.exports = rules;