

MainAccount.prototype.splitAccounts = function() {
  var totalToSplit = parseInt(this.initialDeposit);
  var savingsDeposit = Math.ceil(totalToSplit / 10);
  var checkingDeposit = Math.floor(totalToSplit - savingsDeposit);
  var checking = new Account(checkingDeposit);
  var savings = new Account(savingsDeposit);

  this.checkingAccount = checking;
  this.savingsAccount = savings;

  console.log(checking);
  console.log(savings);
  }

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



// Interface Logic
$(function () {
  $("form#registerForm").submit(function(event) {
    event.preventDefault();

    var accountName = $("input#nameInput").val();
    var initialAmount = $("input#initialAmount").val();

    var userAccount = new MainAccount(accountName, initialAmount);
    userAccount.splitAccounts();
    console.log(userAccount);



    $("#userName").text(userAccount.name);
    $("#checkingTotal,#checkView").each(function() {
      $(this).text(userAccount.checkingAccount.total);
    });
    $("#savingsTotal, #savingsView").each(function() {
      $(this).text(userAccount.savingsAccount.total);
    });
    $(".accountInfo").show();
    $(".registerField").hide();
  });
});
