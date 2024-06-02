const assert = require('assert');
const ParkingLot = require('../lib/parking_lot'); // Adjust the path if necessary

describe('ParkingLot', () => {
    describe('parkCar', () => {
        it('should park a car and return the allocated slot number', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.parkCar("KA-01-HH-1234", "White");
            assert.strictEqual(result, "Allocated slot number: 1");
        });

        it('should return "Sorry, parking lot is full." when there are no empty slots', () => {
            const parkingLot = new ParkingLot(1);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            const result = parkingLot.parkCar("KA-01-HH-9999", "Black");
            assert.strictEqual(result, "Sorry, parking lot is full.");
        });
    });

    describe('leaveSlot', () => {
        it('should vacate the slot and return slot number', () => {
            const parkingLot = new ParkingLot(6);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            const result = parkingLot.leaveSlot(1);
            assert.strictEqual(result, "Slot number 1 is free.");
        });

        it('should return "Slot number <num> is already empty or invalid." when slot is already empty', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.leaveSlot(1);
            assert.strictEqual(result, "Slot number 1 is already empty or invalid.");
        });
    });

    describe('getRegNumsByColor', () => {
        it('should return registration numbers of cars with the given color', () => {
            const parkingLot = new ParkingLot(6);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            parkingLot.parkCar("KA-01-HH-9999", "White");
            const result = parkingLot.getRegNumsByColor("White");
            assert.strictEqual(result, "KA-01-HH-1234, KA-01-HH-9999");
        });

        it('should return "Not found." if no cars of the given color are parked', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.getRegNumsByColor("Blue");
            assert.strictEqual(result, "Not found.");
        });
    });

    describe('getSlotsByColor', () => {
        it('should return slot numbers of cars with the given color', () => {
            const parkingLot = new ParkingLot(6);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            parkingLot.parkCar("KA-01-HH-9999", "White");
            const result = parkingLot.getSlotsByColor("White");
            assert.strictEqual(result, "1, 2");
        });

        it('should return "Not found." if no cars of the given color are parked', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.getSlotsByColor("Blue");
            assert.strictEqual(result, "Not found.");
        });
    });

    describe('getSlotByRegNum', () => {
        it('should return slot number of the car with the given registration number', () => {
            const parkingLot = new ParkingLot(6);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            const result = parkingLot.getSlotByRegNum("KA-01-HH-1234");
            assert.strictEqual(result, 1);
        });

        it('should return "Not found." if no car with the given registration number is parked', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.getSlotByRegNum("KA-01-HH-9999");
            assert.strictEqual(result, "Not found.");
        });
    });

    describe('getStatus', () => {
        it('should return the status of the parking lot', () => {
            const parkingLot = new ParkingLot(6);
            parkingLot.parkCar("KA-01-HH-1234", "White");
            parkingLot.parkCar("KA-01-HH-9999", "White");
            const result = parkingLot.getStatus();
            const expectedOutput = "Slot No.\tRegistration No\t\tColour\n1\t\tKA-01-HH-1234\t\tWhite\n2\t\tKA-01-HH-9999\t\tWhite";
            assert.strictEqual(result, expectedOutput);
        });

        it('should return "No cars parked." if the parking lot is empty', () => {
            const parkingLot = new ParkingLot(6);
            const result = parkingLot.getStatus();
            const expectedOutput = "Slot No.\tRegistration No\t\tColour\n1\t\t-\t\t-\n2\t\t-\t\t-\n3\t\t-\t\t-\n4\t\t-\t\t-\n5\t\t-\\t\t-\\n6\t\t-\t\t-";
            assert.strictEqual(result, expectedOutput);
        });
    });
});

