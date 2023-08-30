export default class UseDataCalculation {

    totalRent = (montlyAmount, numberOfDays) => {
        const total = (montlyAmount * numberOfDays)
        return total
    }

    share = (amount, shared, rentTotal, expenses) => {
        const shareGryton = amount - shared - rentTotal - expenses
        return shareGryton
    }

}