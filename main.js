//const input = require("sync-input");
const APP = {
    init() {
        APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage().greeting);
        APP.handleGifts.showGifts().body();
        APP.showMenu();
    },
    showMenu() {
        let terminate = false;
        do {
            switch (APP.handleUserInput.setUserInput(APP.handleMessages.selectPrompt().menuSelectionPrompt)) {
                case 1:
                    APP.handleGifts.selectGift();
                    break;
                case 2:
                    APP.handleTickets.buyTickets();
                    break;
                case 3:
                    APP.handleTickets.showTicketBalance();
                    break;
                case 4:
                    APP.handleGifts.showGifts().allParts();
                    break;
                case 5:
                    terminate = true;
                    break;
                default:
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().notANumber);
                    break;
            }
        }while (!terminate);
        APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage().farewell);
    },
    handleUserInput: function() {
        let userInput = 0;

        return {
            setUserInput: function(msg) {
                userInput = parseInt(prompt(msg));
                // userInput = Number(input(msg));
                if (APP.handleUserInput.validateUserInput()) {
                    return userInput;
                }
                return userInput = false;
            },
            getUserInput: function() {
                return userInput;
            },
            validateUserInput: function() {
                if (isNaN(userInput)) {
                    //APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().notANumber);
                    return false;
                } else if (!(userInput >= 0 && userInput <= 1000)) {
                    //APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().outOfRange);
                    return false
                }
                return true;
            }
        }
    }(),
    handleMessages: function() {

        return  {
            selectPrompt() {
                return {
                    menuSelectionPrompt: `What do you want to do?\n1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n`,
                    giftSelectionPrompt: `Enter the number of the gift you want to get:`,
                    ticketTransactionPrompt: `Enter the ticket amount:`
                }
            },
            selectMessage(gift = {id: 0, name: '', price: 0}, amount) {
                return {
                    greeting: `WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!\nHere's the list of gifts:\n`,
                    farewell: 'Have a nice day!',
                    giftTransaction: `Here you go, one ${gift.name || "empty"}!`,
                    giftListHeader: `Here's the list of gifts:\n`,
                    giftListItemRow: `${gift.id || "empty"}- ${gift.name || "empty"}, Cost: ${gift.price || "empty"} tickets`,
                    ticketTransaction: `Here you go, ${amount} tickets!`,
                    showTicketBalance: `Total tickets: ${amount}`,
                    newLine: ``
                }
            },
            selectWarning() {
                return {
                    notANumber: `Please enter a valid number!\n`,
                    outOfRange: `Please enter a valid number between 0 and 1000.\n`,
                    giftNotFound: `There is no gift with that number!\n`,
                    noRemainingGifts: `Wow! There are no gifts to buy.\n`,
                    insufficientTickets: `You don't have enough tickets to buy this gift.`
                }
            },
            displayTextToUser(displayText) {
                return console.log(displayText);
            }
        }
    }(),
    handleGifts: function() {
        let giftList = [
            {
                name: "Teddy Bear",
                price: 10,
                id: 1
            },
            {
                name: "Big Red Ball",
                price: 5,
                id: 2
            },
            {
                name: "Huge Bear",
                price: 50,
                id: 3
            },
            {
                name: "Candy",
                price: 8,
                id: 4
            },
            {
                name: "Stuffed Tiger",
                price: 15,
                id: 5
            },
            {
                name: "Stuffed Dragon",
                price: 30,
                id: 6
            },
            {
                name: "Skateboard",
                price: 100,
                id: 7
            },
            {
                name: "Toy Car",
                price: 25,
                id: 8
            },
            {
                name: "Basketball",
                price: 20,
                id: 9
            },
            {
                name: "Scary Mask",
                price: 75,
                id: 10
            }
        ];
        return {
            itemNumber() {
                return APP.handleUserInput.setUserInput(APP.handleMessages.selectPrompt().giftSelectionPrompt);
            },
            selectGift: function () {
                if (giftList.length) {
                    // selectedItem = false
                    let selectedItem = APP.handleGifts.itemNumber();
                    let giftItem = giftList.find(gift => gift.id === selectedItem);
                    if (giftItem) {
                        APP.handleGifts.buyGift(giftItem);
                    } else if (selectedItem !== false) {
                        APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().giftNotFound);
                    } else {
                        APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().notANumber);
                    }
                } else {
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().noRemainingGifts);
                }
            },
            buyGift: function (giftItem) {
                if (APP.handleTickets.getTicketBalance() >= giftItem.price) {
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage(giftItem).giftTransaction);
                    APP.handleGifts.removeGift(giftItem);
                    APP.handleTickets.withdrawTickets(giftItem.price);
                } else {
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().insufficientTickets);
                }
                APP.handleTickets.showTicketBalance();
            },
            removeGift: function (giftItem) {
                giftList = giftList.filter(item => item.id !== giftItem.id);
            },
            showGifts: function () {
                return {
                    allParts: function() {
                        if (giftList.length) {
                            APP.handleGifts.showGifts().header();
                            APP.handleGifts.showGifts().body();
                            APP.handleGifts.showGifts().footer();
                        } else {
                            APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage().giftListHeader);
                            APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().noRemainingGifts);
                        }
                    },
                    header: function () {
                        APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage().giftListHeader);
                    },
                    body: function () {
                        giftList.forEach((gift) => {
                            APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage(gift).giftListItemRow);
                        });
                    },
                    footer: function () {
                        APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage().newLine);
                    }
                }
            }
        }
    }(),
    handleTickets: function () {
        let sum = 0;
        let amount = 0;
        console.log(sum, amount);
        return {
            buyTickets: function () {
                amount = APP.handleUserInput.setUserInput(APP.handleMessages.selectPrompt().ticketTransactionPrompt);
                if (amount || amount === 0) {
                    APP.handleUserInput.validateUserInput(amount);
                    APP.handleTickets.depositTickets(amount);
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage(undefined, amount).ticketTransaction);
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage(undefined, sum).showTicketBalance);
                } else {
                    APP.handleMessages.displayTextToUser(APP.handleMessages.selectWarning().outOfRange);
                }
            },
            depositTickets: function (amount) {
                sum += amount;
                return sum;
            },
            withdrawTickets: function (amount) {
                sum -= amount;
                return sum;
            },
            getTicketBalance: function() {
                return sum;
            },
            showTicketBalance: function() {
                APP.handleMessages.displayTextToUser(APP.handleMessages.selectMessage(undefined, sum).showTicketBalance);
            }
        }
    }()
}
APP.init();