let validating = {

    onLength: function (inputContainer, neededLengthStartOfRange, neededLengthEndOfRange) {
        let input = inputContainer.getElementsByTagName('input')[0]

        if (input.value.length < neededLengthStartOfRange || input.value.length > neededLengthEndOfRange) {
            makeAnError(true, inputContainer, `Введите не менее ${neededLengthStartOfRange} символов и не более, чем ${neededLengthEndOfRange} символов!`)

            return false
        } else {
            makeAnError(false, inputContainer)
            return true
        }
    },
    isLink: function (inputContainer) {
        let input = inputContainer.getElementsByTagName('input')[0]

        let regExpLink = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

        if (!input.value.match(regExpLink)) {
            makeAnError(true, inputContainer, `Введите ссылку!`)

            return false
        } else {
            makeAnError(false, inputContainer)

            return true
        }
    }
}

function makeAnError(thereIsAnError, inputContainer, textOfError) {
    let errorCaption = inputContainer.querySelector('.popup__input-error')
    let errorBorder = inputContainer.querySelector('.popup__input-border')

    if (thereIsAnError === true) {
        errorCaption.classList.add('popup__input-error--error')
        errorBorder.classList.add('popup__input-border--error')
        errorCaption.textContent = textOfError
    } else {
        errorCaption.classList.remove('popup__input-error--error')
        errorBorder.classList.remove('popup__input-border--error')
    }
}



//Проверки инпутов
function checkInputsAndBlockButton(button, ...inputs) {
    let resultsList = []

    for (let input of inputs) {
        let inputContainer = input.inputContainer
        let arrayOfSettings = []
        arrayOfSettings.push(inputContainer)

        for (let key in input.settings) {
            if (key !== 'typeOfValidation') {
                arrayOfSettings.push(input.settings[key])
            }
        }

        let result = validating[input.settings.typeOfValidation].apply(this, arrayOfSettings)

        resultsList.push(result)
    }

    function checkResults(resultsList) {
        for (let i = 0; i < resultsList.length; i++) {
            if (resultsList[i] == false) {
                return true
            }
        }
    }

    if (checkResults(resultsList)) {
        button.classList.add('button--black-full-width--inactive')
    } else {
        button.classList.remove('button--black-full-width--inactive')
    }
}



module.exports = {
    validating, makeAnError, checkInputsAndBlockButton, 
}