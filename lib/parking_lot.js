class ParkingLot {
    constructor(capacity) {
        this.capacity = capacity;
        this.slots = Array.from({ length: capacity }, (_, i) => new Slot(i + 1));
        this.regNumSlotMap = {};
        this.colorRegNumMap = {};
    }

    parkCar(regNum, color) {
        const availableSlot = this.slots.find(slot => slot.isEmpty());
        if (availableSlot) {
            const car = new Car(regNum, color);
            availableSlot.park(car);
            this.regNumSlotMap[regNum] = availableSlot.slotNumber;
            if (color in this.colorRegNumMap) {
                this.colorRegNumMap[color].push(regNum);
            } else {
                this.colorRegNumMap[color] = [regNum];
            }
            return `Allocated slot number: ${availableSlot.slotNumber}`;
        }
        return "Sorry, parking lot is full.";
    }

    leaveSlot(slotNumber) {
        if (slotNumber < 1 || slotNumber > this.capacity) {
            return "Invalid slot number.";
        }
        const slot = this.slots[slotNumber - 1];
        if (slot && slot.car) { // Check if slot and car are valid
            const regNum = slot.car.regNum;
            const color = slot.car.color;
            slot.leave();
            delete this.regNumSlotMap[regNum];
            if (this.colorRegNumMap[color]) {
                this.colorRegNumMap[color] = this.colorRegNumMap[color].filter(reg => reg !== regNum);
            }
            return `Slot number ${slotNumber} is free.`;
        } else {
            return `Slot number ${slotNumber} is already empty or invalid.`;
        }
    }




    getRegNumBySlot(slotNumber) {
        const slot = this.slots[slotNumber - 1];
        return slot.car ? slot.car.regNum : "Not found.";
    }

    getCarColor(regNum) {
        const slotNumber = this.regNumSlotMap[regNum];
        const slot = this.slots[slotNumber - 1];
        return slot.car ? slot.car.color : "Not found.";
    }

    getRegNumByColor(color) {
        if (this.colorRegNumMap[color]) {
            return this.colorRegNumMap[color].join(', ');
        }
        return "Not found.";
    }

    // getSlotByRegNum(regNum) {
    //     if (this.regNumSlotMap[regNum]) {
    //         return this.regNumSlotMap[regNum];
    //     }
    //     return "Not found.";
    // }


    getSlotByRegNum(regNum) {
        const slotNumber = this.regNumSlotMap[regNum];
        return slotNumber ? slotNumber : "Not found.";
    }

    getRegNumsByColor(color) {
        const regNums = this.colorRegNumMap[color];
        return regNums ? regNums.join(', ') : "Not found.";
    }

    getSlotsByColor(color) {
        const regNums = this.colorRegNumMap[color] || [];
        const slots = regNums.map(regNum => this.regNumSlotMap[regNum]);
        if (slots.length) {
            return slots.join(', ');
        }
        return "Not found.";
    }
    


    isFull() {
        return this.slots.every(slot => !slot.isEmpty());
    }

    getStatus() {
        let status = "Slot No.\tRegistration No\t\tColour\n";
        this.slots.forEach(slot => {
            const regNum = slot.car ? slot.car.regNum : "-";
            const color = slot.car ? slot.car.color : "-";
            status += `${slot.slotNumber}\t\t${regNum}\t\t${color}\n`;
        });
        return status.trim();
    }
}

class Car {
    constructor(regNum, color) {
        this.regNum = regNum;
        this.color = color;
    }
}

class Slot {
    constructor(slotNumber) {
        this.slotNumber = slotNumber;
        this.car = null;
    }

    park(car) {
        if (!this.car) {
            this.car = car;
            return true;
        }
        return false;
    }

    leave() {
        if (this.car) {
            this.car = null;
            return true;
        }
        return false;
    }

    isEmpty() {
        return !this.car;
    }
}

// Command line interface
function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const parkingLot = new ParkingLot(6); // Assuming a parking lot with 6 slots

    rl.setPrompt('Enter command: ');
    rl.prompt();

    rl.on('line', (line) => {
        const output = executeCommand(parkingLot, line.trim());
        console.log(output);
        rl.prompt();
    }).on('close', () => {
        console.log('Exiting...');
        process.exit(0);
    });
}



function executeCommand(parkingLot, command) {
    const parts = command.split(' ');
    switch (parts[0]) {
        case "create_parking_lot":
            const capacity = parseInt(parts[1]);
            return `Created a parking lot with ${capacity} slots.`;
        case "park":
            const regNum = parts[1];
            const color = parts[2];
            return parkingLot.parkCar(regNum, color);
        case "leave":
            const slotNumber = parseInt(parts[1]);
            return parkingLot.leaveSlot(slotNumber);
        case "status":
            return parkingLot.getStatus();
        case "registration_numbers_for_cars_with_colour":
            const colorArg = parts[1];
            return parkingLot.getRegNumsByColor(colorArg);
        case "slot_numbers_for_cars_with_colour":
            const colorArg2 = parts[1];
            return parkingLot.getSlotsByColor(colorArg2);
        case "slot_number_for_registration_number":
            const regNumArg = parts[1];
            return parkingLot.getSlotByRegNum(regNumArg);
        case "exit":
            process.exit(0);
        default:
            return "Invalid command.";
    }
}


main();
