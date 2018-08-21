// Business Logic

function MainAccount(userName, initialAmount) {
  this.name = userName;
  this.initialDeposit = initialAmount;
  this.checkingAccount = [];
  this.savingsAccount = [];
}

function Account(deposit) {
  this.total = deposit;
  this.transactions = [];
}

MainAccount.prototype.splitAccounts = function() {
  var totalToSplit = parseInt(this.initialDeposit);
  var savingsDeposit = Math.ceil(totalToSplit / 10);
  var checkingDeposit = Math.floor(totalToSplit - savingsDeposit);
  var checking = new Account(checkingDeposit);
  var savings = new Account(savingsDeposit);

  this.checkingAccount = checking;
  this.savingsAccount = savings;
}

Account.prototype.withdrawFunds = function(value) {
  var withdrawal = parseInt(value);
  this.total = this.total - withdrawal;
  this.transactions.push("-" + withdrawal);
  console.log(this.transactions);
}

Account.prototype.depositFunds = function(value) {
  var deposit = parseInt(value);
  this.total = this.total + deposit;
  this.transactions.push("+" + deposit);
  console.log(this.transactions);
}


// Interface Logic
$(function () {
  var userAccount;
  // Registration Form
  $("form#registerForm").submit(function(event) {
    event.preventDefault();

    var accountName = $("input#nameInput").val();
    var initialAmount = $("input#initialAmount").val();

    userAccount = new MainAccount(accountName, initialAmount);
    userAccount.splitAccounts();


    $("#userName").text(userAccount.name);
    $("#checkingTotal,#checkView").each(function() {
      $(this).text(userAccount.checkingAccount.total);
    });
    $("#savingsTotal, #savingsView").each(function() {
      $(this).text(userAccount.savingsAccount.total);
    });
    $(".accountInfo").show();
    $(".registerField").hide();
    $(".hideClass").show();
  });
  // Checking Transaction Form
  $("form#checkingInput").submit(function(event) {
    event.preventDefault();
    var transactionType = $("input:radio[name='checkTransType']:checked").val();
    var transactionAmount = $("input#checkTransAmount").val();
    console.log(transactionType);
    if (transactionType == "withdraw") {
      userAccount.checkingAccount.withdrawFunds(transactionAmount);
    } else if (transactionType == "deposit") {
      userAccount.checkingAccount.depositFunds(transactionAmount);
    } else {
      alert("Your transaction could not be processed.  Please try again.");
    }
    $("#checkingTotal,#checkView").each(function() {
      $(this).text(userAccount.checkingAccount.total);
    });
  });
  // Saving Transaction Form
  $("form#savingsInput").submit(function(event) {
    event.preventDefault();
    var transactionType = $("input:radio[name='saveTransType']:checked").val();
    var transactionAmount = $("input#saveTransAmount").val();
    console.log(transactionType);
    if (transactionType == "withdraw") {
      userAccount.savingsAccount.withdrawFunds(transactionAmount);
    } else if (transactionType == "deposit") {
      userAccount.savingsAccount.depositFunds(transactionAmount);
    } else {
      alert("Your transaction could not be processed.  Please try again.");
    }
    $("#savingsTotal,#savingsView").each(function() {
      $(this).text(userAccount.savingsAccount.total);
    })
  });
});
