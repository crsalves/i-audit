$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');

    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });

    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});


function checkMyCheckbox(event) {
    if (this.checked) {
        alert("bingo")
    }
}

function uncheck() {
    $(".checkbox").each(function () {
        this.checked = false;
    })

    $("#deleteTransaction").find(".myClassTest").remove()

}

function reply_click(event) {
    var id = event.id;// transaction_id

    $("table > tbody > tr").each(function () {
        var row = $(this);

        if (row.find(".transaction_id").text() == id) {
            var transaction_date = row.find(".transaction_date").text()
            var date = new Date(transaction_date);
            var yr = date.getFullYear();
            var mo = date.getMonth() + 1;
            var month = (mo < 10) ? '0' + mo : mo;
            var d = date.getDate();
            var day = (d < 10) ? '0' + d : d;

            var hours = date.getHours();
            var hr = hours < 10 ? '0' + hours : hours;

            var minutes = date.getMinutes();
            var min = (minutes < 10) ? '0' + minutes : minutes;

            var seconds = date.getSeconds();
            var sec = (seconds < 10) ? '0' + seconds : seconds;

            var newDateString = yr + '-' + month + '-' + day;
            var newTimeString = hr + ':' + min;

            var excelDateString = newDateString + 'T' + newTimeString;
            $("#transactionDate").val(excelDateString);


            var category_type = row.find(".category_type").text()
            switch (category_type) {
                case "Salary":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=1]').prop('checked', true);
                    break;
                case "Cash Back":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=2]').prop('checked', true);
                    break;
                case "House Rent":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=3]').prop('checked', true);
                    break;
                case "Electricity":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=4]').prop('checked', true);
                case "Food":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=5]').prop('checked', true);
                    break;
                case "Internet":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=6]').prop('checked', true);
                    break;
                case "Personal Care":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=7]').prop('checked', true);
                    break;
                case "Entertainment":
                    $("#editTransaction").find(".modal-body input:radio[name=category_type]").filter('[value=8]').prop('checked', true);
                    break;
            }


            var transaction_type = row.find(".transaction_type").text()
            if (transaction_type == "Debit") {
                $("#editTransaction").find(".modal-body input:radio[name=transaction_type]").filter('[value=1]').prop('checked', true);
            } else if (transaction_type == "Credit") {
                $("#editTransaction").find(".modal-body input:radio[name=transaction_type]").filter('[value=2]').prop('checked', true);
            }


            var transaction_value = row.find(".transaction_value").text()
            // This omits the negative sign from the string
            if (transaction_value.substring(0, 1) == "-") {
                transaction_value = transaction_value.substring(1);
            }
            $("#editTransaction").find(".modal-content input:text[name=transaction_value]").prop('value', transaction_value);

        }
    });
}

function delete_(){

}