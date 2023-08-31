export default class UseValidation {
  areInputsValid = (inputs) => {
    let valid = inputs?.filter(
      (input) => input == "" || input == undefined || input == null
    );
    if (valid?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  isExpense = (expenses) => {
    if (expenses == "" || expenses == null || expenses == undefined) {
      return false;
    } else {
      return true;
    }
  };

  isComment = (comment) => {
    if (comment == "" || comment == null || comment == undefined) {
      return false;
    } else {
      return true;
    }
  };
}
