const { Receipt } = require('../models/receipt.model');

test('Points calculation', () => {
    const receipt1 = {
        retailer: "Walgreens",
        purchaseDate: "2022-01-02",
        purchaseTime: "08:13",
        total: "2.65",
        items: [{
            shortDescription: "Pepsi - 12-oz",
            price: "1.25",
        }, {
            shortDescription: "Dasani",
            price: "1.40",
        }],
    };
    const result1 = 15;
    const receipt2 = {
        retailer: "Target",
        purchaseDate: "2022-01-02",
        purchaseTime: "13:13",
        total: "1.25",
        items: [{
            shortDescription: "Pepsi - 12-oz",
            price: "1.25",
        }],
    };
    const result2 = 31;
    const receipt3 = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        total: "6.49",
        items: [{
            shortDescription: "Mountain Dew 12PK",
            price: "6.49",
        }],
    };
    const result3 = 12;
    const receipt4 = {
        retailer: "M&MCornerMarket",
        purchaseDate: "2022-03-20",
        purchaseTime: "14:33",
        items: [{
            shortDescription: "Gatorade",
            price: "2.25"
        },{
            shortDescription: "Gatorade",
            price: "2.25"
        },{
            shortDescription: "Gatorade",
            price: "2.25"
        },{
            shortDescription: "Gatorade",
            price: "2.25"
        }],
        total: "9.00",
    };
    const result4 = 109;
    const receipt5 = {
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{
            shortDescription: "Mountain Dew 12PK",
            price: "6.49"
        },{
            shortDescription: "Emils Cheese Pizza",
            price: "12.25"
        },{
            shortDescription: "Knorr Creamy Chicken",
            price: "1.26"
        },{
            shortDescription: "Doritos Nacho Cheese",
            price: "3.35"
        },{
            shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
            price: "12.00"
        }],
        total: "35.35",
    };
    
    const result5 = 28;
    expect(Receipt.calculatePoints(receipt1)).toBe(result1);
    expect(Receipt.calculatePoints(receipt2)).toBe(result2);
    expect(Receipt.calculatePoints(receipt3)).toBe(result3);
    expect(Receipt.calculatePoints(receipt4)).toBe(result4);
    expect(Receipt.calculatePoints(receipt5)).toBe(result5);
});