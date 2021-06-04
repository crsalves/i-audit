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

// bind this event to all delete buttons
$(".delete").click(function () {

    // find the modal body
    var modal = $("#deleteTransaction").find(".modal-body");

    // loop through all the check boxes (class checkbox)
    $(".checkbox").each(function () {

        // if they are checked, add them to the modal
        var transaction_id = $(this).val();

        if ($(this).is(":checked")) {

            // add a hidden input element to modal with article ID as value
            $(modal).append("<input name='transaction_id' value='" + transaction_id + "' />")
        }
    });
});


$(".edit").click(function () {
    var b = $(".transactionRow").html()
    alert(b)
});

