
```markdown
# Parking Lot Management System

A simple command-line parking lot management system implemented in JavaScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Running Tests](#running-tests)
- [License](#license)

## Introduction

This project is a command-line application to manage a parking lot. It allows users to park cars, leave slots, and query the parking lot status. The application is built using JavaScript and is designed to be simple and easy to use.

## Features

- Park a car into the parking lot.
- Remove a car from the parking lot.
- Get registration numbers of all cars with a particular color.
- Get slot numbers of all cars with a particular color.
- Get the slot number of a car with a particular registration number.
- Display the status of the parking lot.


## Installation

1. Clone the repository:

   ```sh
   git clone
   cd parking-lot
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Usage

To start the parking lot management system, run:

```sh
node index.js
```

You will be prompted to enter commands to interact with the parking lot system.

## Commands

- `create_parking_lot <capacity>`: Creates a parking lot with the specified number of slots.
- `park <registration_number> <color>`: Parks a car with the given registration number and color.
- `leave <slot_number>`: Removes the car from the specified slot number.
- `registration_numbers_for_cars_with_colour <color>`: Retrieves registration numbers of all cars with the specified color.
- `slot_numbers_for_cars_with_colour <color>`: Retrieves slot numbers of all cars with the specified color.
- `slot_number_for_registration_number <registration_number>`: Retrieves the slot number of the car with the specified registration number.
- `status`: Displays the current status of the parking lot.
- `exit`: Exits the application.

### Example Usage

```sh
$ create_parking_lot 6
Created a parking lot with 6 slots.

$ park KA-01-HH-1234 White
Allocated slot number: 1

$ park KA-01-HH-9999 White
Allocated slot number: 2

$ leave 1
Slot number 1 is free.

$ status
Slot No.  Registration No   Colour
1         KA-01-HH-1245     Red
2         KA-01-HH-9999     White
3         -                 -
4         -                 -
5         -                 -
6         -                 -

$ registration_numbers_for_cars_with_colour White
KA-01-HH-9999

$ slot_numbers_for_cars_with_colour White
2

$ slot_number_for_registration_number KA-01-HH-9999
2

$ slot_number_for_registration_number MH-04-AY-1111
Not found

$ exit
Exiting...
```

## Running Tests

To run the tests, use the following command:

```sh
npm test
```

The tests cover various functionalities of the parking lot management system, ensuring that cars are parked correctly, slots are vacated properly, and status and query methods return the expected results.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Notes:

- Adjust the repository URL in the `git clone` command to your actual GitHub repository URL.
- Ensure that the `LICENSE` file is present if you're referring to it in the License section. If not, you might want to add one or remove that section.

This README provides a comprehensive guide to understanding and using your Parking Lot application. It includes installation instructions, usage examples, command details, and testing information.