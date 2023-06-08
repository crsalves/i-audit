function populate_modal_window(event) {
    var transaction_id = event.id;

    $("table > tbody > tr").each(function () {
        var row = $(this);
        var row_id = $(this).attr("id")
        if (row_id == transaction_id) {
            // Date
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

            // category
            var category_type = row.find(".category_type").text().trim()
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


            // type of transaction
            var transaction_type = row.find(".transaction_type").text().trim()
            if (transaction_type === "Debit") {
                $("#editTransaction").find(".modal-body input:radio[name=transaction_type]").filter('[value=1]').prop('checked', true);
            } else if (transaction_type == "Credit") {
                $("#editTransaction").find(".modal-body input:radio[name=transaction_type]").filter('[value=2]').prop('checked', true);
            }

            // transaction value
            var transaction_value = row.find(".transaction_value").text()

            // This omits the negative sign from the string
            if (transaction_value.substring(0, 1) == "-") {
                transaction_value = transaction_value.substring(1);
            }
            $("#editTransaction").find(".modal-content input:text[name=transaction_value]").prop('value', transaction_value);
        }
    });

}

$(".edit").click(function () {
    var modal = $("#editTransaction").find(".modal-body");
    var transaction_id = $(this).attr("id");
    $(modal).append("<input type='text' class='transactionEditAppend' name='transaction_id' value='" + transaction_id + "' hidden/>")
});

function remove_transaction_id_edit_append() {
    $("#editTransaction").find(".modal-body input:text[name=transaction_id]").remove();
}

$(".delete").click(function () {
    var modal = $("#deleteTransaction").find(".modal-body");
    var transaction_id = $(this).attr("id");
    $(modal).append("<input type='text' class='transactionDeleteAppend' name='transaction_id' value='" + transaction_id + "' hidden/>")
});

function remove_transaction_id_delete_append() {
    $("#deleteTransaction").find(".modal-body input:text[name=transaction_id]").remove();
}